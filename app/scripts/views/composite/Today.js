define([
	'backbone',
	'views/item/Task',
	'hbs!tmpl/composite/Today_tmpl',
    '../../collections/Tasks'

],
function (Backbone, Task, TodayTmpl, TasksCollection) {
    'use strict';

    /* Return a CompositeView class definition */
    return Backbone.Marionette.CompositeView.extend({

        initialize: function () {
            this.collection = new TasksCollection([
                { title: 'Wet Cat' },
                { title: 'Bitey Cat' },
                { title: 'Surprised Cat' }
            ]);
        },

        itemView: Task,

        template: TodayTmpl,


        /* ui selector cache */
        ui: {},

        /* where are we appending the items views */
        itemViewContainer: "#task-list",

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function () {
        }
    });

});
