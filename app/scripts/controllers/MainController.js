/// <reference path="TodayController.js" />
define([
    'backbone',
    'regionManager',
    'reqres',
    'views/layout/AppLayout',
    'qs',
    'vent',
    'controllers/SignInController',
    'controllers/NotificationController',
    'controllers/InboxOutboxController',
    'controllers/TodayController',
  ],
  function(Backbone, regionManager, reqres, AppLayout, qs, vent, SignInController, NotificationController, inboxOutboxController, TodayController) {
    'use strict';
    return Backbone.Marionette.Controller.extend({

      initialize: function(options) {
        /*
        get the application region manager, which is available on the global reqres
         */
        this._regionManager = reqres.request('app:regionmanager') || new Backbone.Marionette.RegionManager()
        /*
        get the app layout region which will be used for loading the main application view
         */
        this._region = this._regionManager.get('app_layout_region')

        this._appLayout = reqres.request('app:layout')
      },
      /**
       * load the today Controller
       */
      today: function() {
        var todayController = new TodayController({
          region: this._appLayout.page_content
        });
        this._setCurrentMainController(todayController)
      },
      /**
       * load the inbox/outbox controller
       */
      inbox_outbox: function() {
        this.inboxOutboxController = new inboxOutboxController({
          region: this._appLayout.page_content
        });
        this._setCurrentMainController(this.inboxOutboxController)
      },
      /**
       * load the notification
       */
      notification: function() {
        this.notificationController = new NotificationController({
          region: this._appLayout.page_content
        });
        this._setCurrentMainController(this.notificationController)
      },
      /**
       * load the tasks controller
       */
      tasks: function() {},
      /**
       * load signin controller with signin layout
       */
      signin: function() {
        this._setCurrentMainController(new SignInController({
          region: this._region
        }))
      },
      /**
       * handle access token in url
       */
      access_token: function() {
        var auth = this._parseFragment()
        vent.trigger('account:setauth', auth)
        this._restoreAppState(auth.state)
      },
      _restoreAppState: function(state) {
        state = state || ''

        if (state.match(/signin/)) state = ''

        Backbone.history.navigate(state, {
          trigger: true
        })
      },
      /**
       * parses the current url fragment into an auth object. In addition to that it parses the provider attribute from the state url
       * @return {object} returns an object with all oauth info
       */
      _parseFragment: function() {
        var auth = qs.parse(Backbone.history.fragment)
        auth.expires = (new Date()).getTime() + auth.expires_in
        //if expires_in is a string. convert it to int
        if (typeof auth.expires_in) auth.expires_in = parseInt(auth.expires_in)
        var _provider = _.last(auth.state.split('?'))
        delete auth.state
        delete auth.expires_in
        _provider = qs.parse(_provider)
        if (!_.has(_provider, 'provider')) return auth
        _provider = _provider.provider
        auth.provider = _provider
        return auth
      },
      /**
       * load the applayout as needed. i.e. it is not necessary #signin
       */
      /**
       * set the current controller
       * @param {Backbone.Controller} controller
       */
      _setCurrentMainController: function(controller) {
        this._currentController && this._currentController.close()
        this._currentController = controller
      }
    });

  });