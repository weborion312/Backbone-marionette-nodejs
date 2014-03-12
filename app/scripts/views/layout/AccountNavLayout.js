define([
	'backbone',
	'hbs!tmpl/layout/AccountNavLayout_tmpl'
],
function( Backbone, AccountnavlayoutTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Accountnavlayout Layout");
		},
		
    	template: AccountnavlayoutTmpl,
    	

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
