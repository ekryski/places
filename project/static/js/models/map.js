/**
 * @fileOverview Place module
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

    var Map;

    Map = Backbone.Model.extend({
        // Default attributes for the place.
        defaults: {
            zoom: 8,
            center: new google.maps.LatLng(51.397, -114.644),
            mapIcons: [],
            earthIcons: [],
            markers: []
        },

        // Ensure that each place created has `content`.
        initialize: function() {
            //Do nothing yet
        },

        // Remove the view.
        clear: function() {
            this.view.remove();
        }

    });

    return Map;
});