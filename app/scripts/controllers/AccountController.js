define([
    'backbone',
    'reqres',
    'models/Account',
    'vent',
    '_s',
    'backbone.localstorage'
  ],
  function(Backbone, reqres, Account, vent, _) {
    'use strict';

    return Backbone.Marionette.Controller.extend({
      initialize: function(options) {
        this._getFromStorage()
        reqres.setHandler('account:isloggedin', this._isloggedin.bind(this))
        vent.on('account:setauth', this._setAuth.bind(this))
      },
      _getFromStorage: function() {
        //init local storage if not already
        this._localstorage = this._localstorage || new Backbone.LocalStorage('Accounts')
        this._clearExpiredAccounts()
        var _accounts = this._localstorage.findAll()
        if (_accounts.length == 0) return this._account = new Account()
      },
      _clearExpiredAccounts: function() {
        var _accounts = this._localstorage.findAll()
        _.each(_accounts, this._clearAccount.bind(this))
      },
      _clearAccount: function(account) {
        var auth = account.get('auth')
        if (!auth) return
        if (!auth.access_token | !auth.expires) return
        if (auth.expires > (new Date()).getTime()) return
        //remove account from storage
        this._localstorage.destroy(account)
      },
      _setAuth: function(auth) {
        this._account.set('auth', auth)
        //retrieve account from server and then save
        
      },
      _isloggedin: function() {
        if (this._account.get('access_token') && this._account.get('expires') > (new Date()).getTime()) return true
        return false
      }
    });

  });