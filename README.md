## Backend
This app uses [Flask](http://flask.pocoo.org/) as a REST API controller for managing favorite locations in a SQLite3 database. Protocol is JSON in/out.

The DB schema is:

    CREATE TABLE "locations" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      "lat" FLOAT NOT NULL,
      "lng" FLOAT NOT NULL,
      "address" VARCHAR NOT NULL,
      "nickname" VARCHAR NOT NULL
    )

## Front End
It uses [Backbone.js](http://documentcloud.github.com/backbone/) with AMD module wrappers and [RequireJS](http://requirejs.org/). Users should be able to see a list of their favorite locations, view individual locations, add new ones, and edit and delete existing. When viewing a favorite location, it should appear on a Google Map.

## Setup

* Clone the repository and run `python setup.py develop`

## Running the Flask Server

* From inside the `project` directory, run `python api.py`
* Open up `http://127.0.0.1:5000/` in your browser.

## Running Tests

With the flask server already running navigate to the `project` directory and run `python api_test.py`

