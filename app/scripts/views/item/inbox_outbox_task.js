define([
	'backbone',
	'hbs!tmpl/item/inbox_outbox_task_tmpl'
],
function( Backbone, InboxOutboxTaskTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a InboxOutboxTask ItemView");
		},
		
    	template: InboxOutboxTaskTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
