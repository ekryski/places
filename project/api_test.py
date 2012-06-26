'''
API Tests

'''

import os
import api
import json
import unittest
import tempfile
from werkzeug.test import EnvironBuilder

class ApiTestCase(unittest.TestCase):

	'''Before each test, set up a blank database'''
	def setUp(self):
		self.db_fd, api.app.config['DATABASE'] = tempfile.mkstemp()
		api.app.config['TESTING'] = True
		self.app = api.app.test_client()
		# api.connect_db()

	'''Get rid of the database again after each test.'''
	def tearDown(self):
		os.close(self.db_fd)
		os.unlink(api.app.config['DATABASE'])

	#
	# Tests
	#
	def test_index(self):
		'''Test api call for getting all locations'''
		rv = self.app.get('/locations')
		data = json.loads(rv.data)
		self.assertEqual(rv.status_code, 200)
		self.assertEqual(len(data['locations']), 2)

	def test_show(self):
		'''Test api call for getting one location'''
		rv = self.app.get('/locations/1')
		data = json.loads(rv.data)
		self.assertEqual(rv.status_code, 200)
		self.assertEqual(data['id'], 1)

	def test_create_not_json(self):
		'''Should fail when passing invalid location params'''
		rv = self.app.post('/locations', 
			data={
				'lat': 51.044515,
				'lng': -114.063127,
				'address': '101 9 Ave SW, Calgary, AB T2P 1J9',
				'nickname': 'Calgary Tower',
			}, follow_redirects=True)
		self.assertEqual(rv.status_code, 406)

	#TODO: Somehow get the content type correct
	def test_create_invalid_params(self):
		'''Should fail when passing invalid location params'''
		rv = self.app.post('/locations', 
			data={
				'lat': 51.044515,
				'lng': -114.063127,
				'address': '101 9 Ave SW, Calgary, AB T2P 1J9'
			}, 
			headers={
				'content-type': 'application/json'
			},
			follow_redirects=True)
		self.assertEqual(rv.status_code, 400)

	#TODO: Somehow get the content type correct
	def test_create(self):
		'''Test api call for creating a location'''
		self.app.content_type = 'application/json'
		rv = self.app.post('/locations', 
			data={
				'lat': 51.044515,
				'lng': -114.063127,
				'address': '101 9 Ave SW, Calgary, AB T2P 1J9',
				'nickname': 'Calgary Tower',
			},
			content_type='application/json',
			follow_redirects=True)
		data = json.loads(rv.data)
		self.assertEqual(data['nickname'], 'Calgary Tower')

	def test_update_not_json(self):
		'''Should fail when passing invalid location params'''
		rv = self.app.post('/locations', 
			data={
				'lat': 51.044515,
				'lng': -114.063127,
				'address': '101 9 Ave SW, Calgary, AB T2P 1J9',
				'nickname': 'Calgary Tower',
			}, follow_redirects=True)
		self.assertEqual(rv.status_code, 406)

	#TODO: Somehow get the content type correct
	def test_update_invalid_params(self):
		'''Should fail when passing invalid location params'''
		rv = self.app.post('/locations', 
			data={
				'lat': 51.044515,
				'lng': -114.063127,
				'address': '101 9 Ave SW, Calgary, AB T2P 1J9'
			}, 
			headers={
				'content-type': 'application/json'
			},
			follow_redirects=True)
		self.assertEqual(rv.status_code, 400)

	#TODO: Somehow get the content type correct
	def test_update(self):
		'''Test api call for updating a location'''
		self.app.content_type = 'application/json'
		rv = self.app.post('/locations', 
			data={
				'lat': 51.044515,
				'lng': -114.063127,
				'address': '101 9 Ave SW, Calgary, AB T2P 1J9',
				'nickname': 'Calgary Tower',
			},
			content_type='application/json',
			follow_redirects=True)
		data = json.loads(rv.data)
		self.assertEqual(data['nickname'], 'Calgary Tower')

	def test_delete(self):
		'''Test api call for deleting a location'''
		rv = self.app.delete('/locations/3', follow_redirects=True)
		self.assertEqual(rv.status_code, 200)

if __name__ == '__main__':
	unittest.main()