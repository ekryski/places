/**
 * @fileOverview PlaceView module
 */
define(['jquery', 'underscore', 'backbone', '../plugins/markermanager-helper'], function ($, _, Backbone, MarkerManager) {
// The DOM element for a todo item...
  var MapView;

  MapView = Backbone.View.extend({
    geocoder: new google.maps.Geocoder(),
    el: '#map_canvas',

    // Cache the template function for a single item.
    template: _.template($('#place-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .save" : "save"
    },

    // The PlaceView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      // this.eventCollection = MMC.Events;

      /*
      * create the map
      */

      var opts = {
        zoom: this.model.get('zoom'),
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            center: this.model.get('center'),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      this.map = new google.maps.Map(document.getElementById('map_canvas'), opts);

      this.MarkerManager = new MarkerManager(this.map);

      var self = this;

      /*
      * Function used to search for cities or addresses
      */
      $("#search").autocomplete({
        //This bit uses the geocoder to fetch address values
        source: function(request, response) {
          self.geocoder.geocode({
            'address': request.term
          },
          function(results, status) {
            response($.map(results,
            function(item) {
              return {
                label: item.formatted_address,
                value: item.formatted_address,
                latitude: item.geometry.location.lat(),
                longitude: item.geometry.location.lng(),
                viewport: item.geometry.viewport
              }
            }));
          })
        },
        //This bit is executed upon selection of an address
        select: function(event, ui) {
          var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
          self.map.fitBounds(ui.item.viewport);
        }
      });
    },

    // Re-render the map.
    render: function() {
      this.map.panTo(this.model.get('center'));
      this.map.setZoom(this.model.get('zoom'));
      return this;
    },

    // Close the `"editing"` mode, saving changes to the place.
    save: function(ev, el) {
      this.model.save({
        nickname: $('.place-nickname').val(),
        address: $('.place-address').val()
      });
    },

    // Remove this view from the DOM. Navigate to home
    remove: function() {
      console.log('removed');
      $(this.el).remove();
      App.Router.navigate('/');
    }

  });

  return MapView;
});