define([
	 'backbone',
     'regionManager',
     'reqres',
     'views/composite/Today',
     'views/TaskDetails',
     'collections/Tasks',

],
function (Backbone, regionManager, reqres, TodayView, TaskDetailsView, TasksCollection ) {
    'use strict';

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            if(!options.region)throw new Error('this controller requires a region')
            this._region=options.region
            this._regionManager = reqres.request('app:regionmanager')

            var tasksCollection = new TasksCollection([
             { title: 'Wet Cat' },
             { title: 'Bitey Cat' },
             { title: 'Surprised Cat' }
            ]);

            this.todayView = new TodayView({
                collection: tasksCollection
            });

            


            var _this = this;
            var taskDetailsView;

            this.todayView.on("itemview:item:clicked", function (item) {
                $('#task-list-container').attr('class', 'col-md-6 col-sm-6');
                this.details_region = _this._regionManager.get('details_region');
                taskDetailsView = new TaskDetailsView(item.model);
                this.details_region.show(taskDetailsView);
            });

            this._region.show(this.todayView);
        }
    });

});
