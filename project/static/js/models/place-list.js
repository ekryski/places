/**
 * @fileOverview Place Collection
 */
define(['jquery', 'underscore', 'backbone', 'models/place'], function ($, _, Backbone, Place) {

    var PlaceList;

	// The collection of favourite places
	PlaceList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: Place,

	  	url: '/locations',

	  	parse: function(response){
			//TODO: deal with error message
			return response.locations;
		}

	});

	return PlaceList;
});