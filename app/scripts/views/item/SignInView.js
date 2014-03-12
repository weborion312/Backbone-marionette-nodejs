define([
    'backbone',
    'hbs!tmpl/item/SignInView_tmpl',
    'commands'
  ],
  function(Backbone, SigninviewTmpl, commands) {
    'use strict';

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({

      initialize: function() {
        console.log("initialize a Signinview ItemView");
      },

      template: SigninviewTmpl,


      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {
        'click button': '_handleButtonClick'
      },
      _handleButtonClick: function(e) {
        e.preventDefault()
        var _id = e.currentTarget.id.match(/connect\_([a-z]+)/)
        if (_id.length == 0) return
        _id = _id[1]
        commands.execute('auth2:login', _id)
      },
      /* on render callback */
      onRender: function() {}
    });

  });