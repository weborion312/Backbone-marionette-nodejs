define([
		'backbone',
		'communicator',
		'routers/MainRouter',
		'reqres',
		'controllers/Auth2Controller',
		'controllers/AccountController',
		'views/layout/AppLayout'
	],

	function(Backbone, Communicator, MainRouter, reqres, Auth2Controller, AccountController, AppLayout) {
		'use strict';

		var App = new Backbone.Marionette.Application();

		App._getRegionManger = function() {
			return this._regionManager
		}
		/* Add application regions here */
		App.addRegions({
			app_layout_region: '#app_layout',
			page_content_region: '.page-content',
			details_region: '#task-details',
			comments_region: '#comments'
		});
		App._getAppLayout = function() {
			return this._appLayout
		}

		/* Add initializers here */
		App.addInitializer(function() {
			this._auth2Controller = new Auth2Controller()
			this._accountController = new AccountController()
			this._appLayout = new AppLayout()
			this.app_layout_region.show(this._appLayout)
			reqres.setHandler('app:layout', this._getAppLayout.bind(this))
			reqres.setHandler('app:regionmanager', this._getRegionManger.bind(this))
			this._router = new MainRouter()
			Backbone.history.start();
		});
		return App;
	});