(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/SignInNavView'
		],
		function( Signinnavview ) {

			describe('Signinnavview Itemview', function () {

				it('should be an instance of Signinnavview Itemview', function () {
					var SignInNavView = new Signinnavview();
					expect( SignInNavView ).to.be.an.instanceof( Signinnavview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );