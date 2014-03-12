(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/MainRouter'
		],
		function( Mainrouter ) {

			describe('Mainrouter Router', function () {

				it('should be an instance of Mainrouter Router', function () {
					var _MainRouter = new Mainrouter();
					expect( _MainRouter ).to.be.an.instanceof( Mainrouter );
				});
			});

		});

}).call( this );