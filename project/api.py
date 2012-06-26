from flask import Flask
from flask import g
from flask import jsonify
from flask import json
from flask import url_for
from flask import render_template
from flask import request
from flask import abort
from flask import redirect

import sqlite3

app = Flask(__name__)

if app.config['DEBUG']:
    from werkzeug import SharedDataMiddleware
    import os
    app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
        '/': os.path.join(os.path.dirname(__file__), 'static')
    })

#
# Database
#

DATABASE = 'data.sqlite'

def connect_db():
    return sqlite3.connect(DATABASE)

def query_db(query, args=(), one=False):
    cur = g.db.execute(query, args)
    rv = [dict((cur.description[idx][0], value)
               for idx, value in enumerate(row)) for row in cur.fetchall()]
    return (rv[0] if rv else None) if one else rv

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()

#
# Helper Functions
#

def validateData(params):
    expectedParams = {'id', 'lat', 'lng', 'address', 'nickname'}

    print params

    for param in params:
        if param not in expectedParams:
            return False
    return True

def sanitizeData(params):
    expectedParams = {
        'id': int,
        'lat': float, 
        'lng': float,
        'address': str,
        'nickname': str
    }

    sanitizedParams = {}

    for param in params:
        sanitizedParams[param] = expectedParams.get(param)(params[param])

    return sanitizedParams

#
# REST API calls
#

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/locations', methods=['GET'])
def index():
    locations = query_db('select * from locations')
    return jsonify(locations=locations)

@app.route('/locations/<int:location_id>', methods=['GET'])
def show(location_id):
    location = query_db('select * from locations where id = %d' % location_id, (), one=True)
    return jsonify(location)

@app.route('/locations', methods=['POST'])
def create():
    if not request.json:
        abort(406)
    if validateData(request.json):
        data = sanitizeData(request.json)

        cur = g.db.execute('''insert into locations (lat, lng, address, nickname) values (?, ?, ?, ?)''',
            [data['lat'], data['lng'], data['address'], data['nickname']])
        g.db.commit()

        location = query_db('select * from locations where id = %d' % cur.lastrowid, (), one=True)

        response = jsonify(location)
        response.status_code = 201
        return response
    else:
        abort(400)

@app.route('/locations/<int:location_id>', methods=['PUT'])
def update(location_id):
    if not request.json:
        abort(406)
    if validateData(request.json):
        print location_id
        data = sanitizeData(request.json)

        cur = g.db.execute('''update locations set lat=?, lng=?, address=?, nickname=? where id = %d''' % location_id,
            [data['lat'], data['lng'], data['address'], data['nickname']])
        g.db.commit()

        response = jsonify(data)
        response.status_code = 201
        return response
    else:
        abort(400)

@app.route('/locations/<int:location_id>', methods=['DELETE'])
def delete(location_id):
    g.db.execute('delete from locations where id = %d' % location_id)
    g.db.commit()
    return jsonify({'success': True})


#
# Run it!
#

if __name__ == '__main__':
    app.run(debug=True)

