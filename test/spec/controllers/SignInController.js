(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/SignInController'
		],
		function( Signincontroller ) {

			describe('Signincontroller Controller', function () {

				it('should be an instance of Signincontroller Controller', function () {
					var SignInController = new Signincontroller();
					expect( SignInController ).to.be.an.instanceof( Signincontroller );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );