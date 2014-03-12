define([
	'backbone',
	'views/item/inbox_outbox_task',
	'hbs!tmpl/composite/InboxOutbox_tmpl'
],
function( Backbone, InboxOutboxTask, InboxoutboxTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
		},
		
    	itemView: InboxOutboxTask,
    	
    	template: InboxoutboxTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "",

		/* Ui events hash */
		events: {
            'click .gradeX': 'showDescription',
            'click .inbox-star': 'ActivStar'
        },

        showDescription: function(e){
            this.$el.find('.tasklist').addClass('tasklistOpen')
            this.$el.find('.taskDescription').addClass('taskOpen')
            this.$el.find('.task-body').css('height', (this.$el.find('.taskDescription').height()-160)+'px')
            $(window).resize()
            e.preventDefault()
        },

        ActivStar: function(e){
            $(e.currentTarget).toggleClass('active')
            e.preventDefault()
        },

		/* on render callback */
		onRender: function() {}
	});

});
