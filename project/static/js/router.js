/**
 * @fileOverview Router module
 */
define(['jquery', 'underscore', 'backbone', 'views/place', 'views/map'], function ($, _, Backbone, PlaceView, MapView) {

    var PlaceRouter;

    PlaceRouter = Backbone.Router.extend({
        routes: {
            '/': 'home',
            'locations/:id': 'location'
        },
        // Ensure that each place created has `content`.
        initialize: function(options) {
            App = options.app || {};
        },

        home: function(){
            var view = new MapView( {model: App.Map} );
            view.render();
        },

        location: function(id){
            var view = new PlaceView( {model: App.Places.get(id)} );
            view.render();
        }
    });

    return PlaceRouter;
});