define(['jquery', 'underscore', 'backbone', 'models/map', 'models/place-list', 'views/place-list', 'router'], 
  function ($, _, Backbone, Map, PlaceList, PlaceListView, PlaceRouter) {

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#app"),

    // Delegated events for creating new places, and clearing completed ones.
    events: {
    },

    // At initialization we bind to the relevant events on the `Places`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting places from the server.
    initialize: function() {
      this.Router = new PlaceRouter({app: this});
      this.Map = new Map();
      this.Places = new PlaceList();

      this.Places.bind('add',   this.addOne, this);
      this.Places.bind('reset', this.addAll, this);
      this.Places.bind('all',   this.render, this);

      this.Places.fetch();

      this.Router.navigate('/', {trigger: true});
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
    },

    // Add a single place item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(place) {
      var view = new PlaceListView({model: place});
      this.$("#place-list").append(view.render().el);
    },

    // Add all items in the **Places** collection at once.
    addAll: function() {
      this.Places.each(this.addOne);
    }

  });

  return AppView;

});