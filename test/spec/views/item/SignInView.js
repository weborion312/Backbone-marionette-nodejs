(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/SignInView'
		],
		function( Signinview ) {

			describe('Signinview Itemview', function () {

				it('should be an instance of Signinview Itemview', function () {
					var SignInView = new Signinview();
					expect( SignInView ).to.be.an.instanceof( Signinview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );