/**
 * @fileOverview PlaceView module
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
// The DOM element for a todo item...
  var PlaceView;

  PlaceView = Backbone.View.extend({

    el: '#place',

    // Cache the template function for a single item.
    template: _.template($('#place-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .destroy" : "clear",
      "click .edit" : "edit",
      "click .cancel" : "cancel",
      "click .save" : "save"
    },

    // The PlaceView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the place.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      $('.edit-details').hide();
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input fields.
    edit: function() {
      $('.display').hide();
      $('.edit-details').show();
    },

    // Close the `"editing"` mode and cancel changes
    cancel: function() {
      this.render();
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
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  return PlaceView;
});