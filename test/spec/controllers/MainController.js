(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/MainController'
		],
		function( Maincontroller ) {

			describe('Maincontroller Controller', function () {

				it('should be an instance of Maincontroller Controller', function () {
					var _MainController = new Maincontroller();
					expect( _MainController ).to.be.an.instanceof( Maincontroller );
				});
			});

		});

}).call( this );