define([
	'backbone',
	'views/item/Comment',
	'hbs!tmpl/composite/Comments_tmpl',
    '../../collections/Comments'
],
function (Backbone, Comment, CommentsTmpl, CommentsCollection) {
    'use strict';

    /* Return a CompositeView class definition */
    return Backbone.Marionette.CompositeView.extend({

        initialize: function () {
            this.collection = new CommentsCollection([
                { class: 'in', text: 'Wet Cat' },
                { class: 'out', text: 'Bitey Cat' },
                { class: 'in', text: 'Surprised Cat' }
            ]);
        },

        itemView: Comment,

        template: CommentsTmpl,


        /* ui selector cache */
        ui: {},

        /* where are we appending the items views */
        itemViewContainer: "#comments-list",

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function () {
        }
    });

});
