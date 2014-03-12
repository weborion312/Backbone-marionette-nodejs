define([
    'backbone',
    'hbs!tmpl/layout/AppLayout_tmpl',
    'reqres',
    // 'views/layout/AccountNavLayout',
    'views/item/SignInNavView'
  ],
  function(Backbone, ApplayoutTmpl, reqres, SignInNavView
    // ,AccountNavLayout, 
  ) {
    'use strict';

    /* Return a Layout class definition */
    return Backbone.Marionette.Layout.extend({

      initialize: function() {
        //determine if user is logged in
        this._isloggedin = reqres.request('account:isloggedin') || false
        if (this._isloggedin) return this._view = new AccountNavLayout()
        this._view = new SignInNavView()
      },

      template: ApplayoutTmpl,


      /* Layout sub regions */
      regions: {
        page_content: '#page-content',
        account_nav: '#account_nav'
      },

      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {},

      /* on render callback */
      onRender: function() {
        this._view && this.account_nav.show(this._view)
      }
    });

  });