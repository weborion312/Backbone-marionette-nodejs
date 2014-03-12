define([
	'backbone',
	'hbs!tmpl/item/Notification_task_tmpl'
],
function( Backbone, NotificationTaskTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a NotificationTask ItemView");
		},
		
    	template: NotificationTaskTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
