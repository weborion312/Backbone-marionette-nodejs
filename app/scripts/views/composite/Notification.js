define([
	'backbone',
	'views/item/Notification_task',
    'example-data-events-mockup',
	'hbs!tmpl/composite/Notification_tmpl'
],


function( Backbone, NotificationTask, ExampleDataEvents, NotificationTmpl ) {

        'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
		},

        initNotification: function () {
            var self = this
            var h = {};

            if (this.isRTL()) {
                if (this.$el.find('#calendar').parents(".portlet").width() <= 720) {
                    this.$el.find('#calendar').addClass("mobile");
                    h = {
                        right: 'title, prev, next',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    this.$el.find('#calendar').removeClass("mobile");
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }
            } else {
                if (this.$el.find('#calendar').parents(".portlet").width() <= 720) {
                    this.$el.find('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    this.$el.find('#calendar').removeClass("mobile");
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }

            this.$el.find('#calendar').fullCalendar({ //re-initialize the calendar
                header: h,
                slotMinutes: 15,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!

                drop: function (date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    copiedEventObject.className = $(this).attr("data-class");

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    self.$el.find('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events: data
            })
        },

        isRTL:function(){
            if ($('body').css('direction') === 'rtl') {
                return true;
            }else{
                return false;
            }
        },

        showDescription: function(e){
            this.$el.find('#calendar').addClass('tasklistOpen')
            this.$el.find('.taskDescription').addClass('taskOpen')
            this.$el.find('.task-body').css('height', (this.$el.find('.taskDescription').height()-160)+'px')
            $(window).resize()
            e.preventDefault()
        },

        closeDescription:function(e){
            this.$el.find('.taskDescription').removeClass('taskOpen')
            this.$el.find('#calendar').removeClass('tasklistOpen')
            this.$el.find('.task-body').css('height', 'auto')
            $(window).resize()
        },

    	itemView: NotificationTask,
    	
    	template: NotificationTmpl,

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "",

		/* Ui events hash */
		events: {
            'click .fc-event-inner': 'showDescription',
            'click .fc-header-title': 'closeDescription'
        },

		/* on render callback */
		onRender: function() {
        },

        onShow: function(){
            this.initNotification();
        }
	});

});
