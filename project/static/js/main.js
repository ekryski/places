require.config({
    paths: {
        // jquery: 'plugins/jquery-1.7.1',
        underscore: 'plugins/underscore-helper',
        backbone: 'plugins/backbone-helper'
    }
});

require(['plugins/bootstrap.min', 'plugins/json2', 'underscore', 'backbone', 'app'], 
	function(bootstrap, json, _, Backbone, App) {
  // Finally, we kick things off by creating the **App**.
  
  window.App = new App();
  // window.Router = new PlaceRouter();
  // Router.navigate('/', {trigger: true});
  Backbone.history.start({pushState: true});
});