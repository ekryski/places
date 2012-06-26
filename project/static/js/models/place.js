/**
 * @fileOverview Place module
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

    var Place;

    Place = Backbone.Model.extend({
        // Default attributes for the place.
        defaults: {
            lat: null,
            lng: null,
            address: "123 Awesome Street",
            nickname: "My Favourite Place"
        },

        // Ensure that each place created has `content`.
        initialize: function() {
            if (!this.get("nickname")) {
                this.set({"nickname": this.defaults.nickname});
            }
        },

        // Remove this Place from db and delete its view.
        clear: function() {
            this.destroy();
            this.view.remove();
        }

    });

    return Place;
});