define([
	'backbone',
    'underscore',
    'reqres',
	'hbs!tmpl/TaskDetails_tmpl',
    '../views/composite/Comments'
],
function (Backbone, _, reqres, TaskDetailsTmpl, CommentsView) {
    'use strict';

    return Backbone.Marionette.ItemView.extend({
        initialize: function () {

        },

        template: TaskDetailsTmpl,

        onRender: function () {
            this.$el.html(this.template());
        },

        onShow: function () {
            this._regionManager = reqres.request('app:regionmanager')
            this.comments_region = this._regionManager.get('comments_region');
            this.commentsView = new CommentsView();
            this.comments_region.show(this.commentsView);
        }
    });
});
