(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/AppLayout'
		],
		function( Applayout ) {

			describe('Applayout Layout', function () {

				it('should be an instance of Applayout Layout', function () {
					var _AppLayout = new Applayout();
					expect( _AppLayout ).to.be.an.instanceof( Applayout );
				});
			});

		});

}).call( this );