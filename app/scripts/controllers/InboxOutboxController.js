define([
    'backbone',
    'views/composite/InboxOutbox'
  ],
  function(Backbone, inboxOutboxView) {
    'use strict';

    return Backbone.Marionette.Controller.extend({

      initialize: function(options) {
        if(!options.region)throw new Error('this controller requires a region')
            this._region=options.region
        this.inboxOutboxView = new inboxOutboxView()
        this._region.show(this.inboxOutboxView);
      }

    });

  });