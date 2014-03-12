define([
	'backbone',
	'models/Task'
],
function( Backbone, Task ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {	
		},

		model: Task
		
	});
});
