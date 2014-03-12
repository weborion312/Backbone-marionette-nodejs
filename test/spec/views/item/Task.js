(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/Task'
		],
		function( Task ) {

			describe('Task Itemview', function () {

				it('should be an instance of Task Itemview', function () {
					var _Task = new Task();
					expect( _Task ).to.be.an.instanceof( Task );
				});
			});

		});

}).call( this );