define([
	'backbone',
	'hbs!tmpl/item/Task_tmpl'
],
function (Backbone, TaskTmpl) {
    'use strict';

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({

        initialize: function () {
        },

        triggers: {
            "click": "item:clicked"
        },
     
        template: TaskTmpl,

        tagName: 'li',

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function () { }
    });

});