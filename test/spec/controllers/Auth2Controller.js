(function() {
	'use strict';

	var root = this;

	root.define([
			'controllers/Auth2Controller',
			'_s',
			'jquery',
			'superagent',
			'ms'
		],
		function(Auth2, _, $, request, ms) {

			describe('Auth2 Controller', function() {
				var Auth2Controller = {}
				it('should be an instance of Auth2 Controller', function() {
					Auth2Controller = new Auth2();
					expect(Auth2Controller).to.be.an.instanceof(Auth2);
				});

				it('generate google auth url', function() {
					expect(Auth2Controller._getAuthUrl('google')).to.match(/.+scope.+/)
				});
				it('get google redirect url', function(done) {
					this.timeout(ms('10s'))
					request.get(Auth2Controller._getAuthUrl('google'),function(err, res) {
						if(res.status==200)return done()
						done(new Error('failed to get auth redirect'))
					})
				})
			});

		});

}).call(this);