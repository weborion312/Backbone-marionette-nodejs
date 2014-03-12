define([
    'backbone',
    'views/item/SignInView'
  ],
  function(Backbone, SignInView) {
    'use strict';

    return Backbone.Marionette.Controller.extend({

      initialize: function(options) {
        if (!options.region) throw new Error('this controller requires a region')
        this._region = options.region
        this._region.show(new SignInView())
      }
    });

  });