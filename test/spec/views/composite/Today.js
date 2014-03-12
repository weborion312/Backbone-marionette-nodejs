(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/Today'
		],
		function( Today ) {

			describe('Today Compositeview', function () {

				it('should be an instance of Today Compositeview', function () {
					var _Today = new Today();
					expect( _Today ).to.be.an.instanceof( Today );
				});
			});

		});

}).call( this );