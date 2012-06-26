# Uber Web Interview

Use [Flask](http://flask.pocoo.org/) to build a REST API controller for managing favorite locations in a SQLite3 database. Protocol is JSON in/out. The `index` function has already been written. Add API calls to `api.py` to `show`, `create`, `update` and `delete` favorite locations.

Here's the schema:

    CREATE TABLE "locations" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      "lat" FLOAT NOT NULL,
      "lng" FLOAT NOT NULL,
      "address" VARCHAR NOT NULL,
      "nickname" VARCHAR NOT NULL
    )

Use [Backbone.js](http://documentcloud.github.com/backbone/) to build the frontend. Users should be able to see a list of their favorite locations, view individual locations, add new ones, and edit and delete existing. When viewing a favorite location, show it on a Google Map. The `index.html` file already has all dependencies. The Backbone app should be built in `app.js`.

## Setup

* Clone the repository and run `python setup.py develop`

## Running the Flask Server

* From inside the `project` directory, run `python api.py`
* http://127.0.0.1:5000/

