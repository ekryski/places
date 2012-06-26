/**
 * @fileOverview PlaceView module
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
// The DOM element for a todo item...
  var PlaceListView;

  PlaceListView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    // template: _.template($('#place-template').html()),
    template: _.template($('#place-list-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .place-link a": "navigate"
    },

    // The PlaceView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    },

    navigate: function(){
      App.Router.navigate('locations/' + this.model.get('id'), {trigger: true});
    }

  });

  return PlaceListView;
});