define([
    'backbone',
    'reqres',
    'views/composite/Notification'
  ],
  function(Backbone, reqres, NotificationView) {
    'use strict';

    return Backbone.Marionette.Controller.extend({

      initialize: function(options) {
        if(!options.region)throw new Error('this controller requires a region')
            this._region=options.region
        this.notificationView = new NotificationView()
        this._region.show(this.notificationView);
      }
    });
  });