(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/AccountNavLayout'
		],
		function( Accountnavlayout ) {

			describe('Accountnavlayout Layout', function () {

				it('should be an instance of Accountnavlayout Layout', function () {
					var AccountNavLayout = new Accountnavlayout();
					expect( AccountNavLayout ).to.be.an.instanceof( Accountnavlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );