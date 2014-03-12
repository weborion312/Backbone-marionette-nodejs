define([
    'backbone',
    'commands',
    'reqres',
    'qs',
    '_s'
  ],
  function(Backbone, commands, reqres, qs, _) {
    'use strict';

    var _providers = {
      google: {
        url: 'https://accounts.google.com/o/oauth2/auth',
        query: {
          response_type: 'token',
          client_id: '1050642166624-9s0rs9tm1u6065439sfgi9nkd7cphl1m.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile'
        }
      }
    }
    return Backbone.Marionette.Controller.extend({

      initialize: function(options) {
        /*
        this is a global command for logging in with google api
         */
        commands.setHandler('auth2:login', this._login, this)
      },
      _login: function(provider) {
        window.location = this._getAuthUrl(provider)
      },
      _getAuthUrl: function(provider) {
        var _query = _providers[provider].query,
          _state_query = {
            provider: provider
          }
        _state_query = qs.stringify(_state_query)
        _query.state = _.sprintf('%s?%s', Backbone.history.fragment, _state_query)
        _query.redirect_uri = window.location.origin
        /*
        setup login hint, ie, get the email address from the last stored account
        _query.login_hint=
         */
        return _.sprintf('%s?%s', _providers[provider].url, qs.stringify(_query))
      }

    });

  });