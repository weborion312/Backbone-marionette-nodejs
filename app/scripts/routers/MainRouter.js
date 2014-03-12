define([
    'backbone',
    'controllers/MainController'
  ],
  function(Backbone, MainController) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({
      /* Backbone routes hash */
      appRoutes: {
        '': 'today',
        'inbox_outbox': 'inbox_outbox',
        'notification': 'notification',
        'tasks': 'tasks',
        'signin': 'signin'
      },

      initialize: function(options) {
        this.controller = new MainController()
        //add the access_token route
        this.appRoute(/.+access_token=*([^\&]+)/, 'access_token')
      }
    });
  });