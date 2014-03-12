(function() {
	'use strict';

	var root = this;

	root.define([
		'models/Account'
		],
		function( Account ) {

			describe('Account Model', function () {

				it('should be an instance of Account Model', function () {
					var Account = new Account();
					expect( Account ).to.be.an.instanceof( Account );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );