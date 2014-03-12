define(function() {
	'use strict';

	/* return an array of specs to be run */
	return {
		specs: ['spec/controllers/AccountController.js',
		'spec/controllers/Auth2Controller.js',
		'spec/controllers/MainController.js',
		'spec/controllers/SignInController.js',
		'spec/models/Account.js',
		'spec/routers/MainRouter.js',
		'spec/views/composite/Today.js',
		'spec/views/item/SignInNavView.js',
		'spec/views/item/SignInView.js',
		'spec/views/item/Task.js',
		'spec/views/layout/AccountNavLayout.js',
		'spec/views/layout/AppLayout.js'
		]
	};
});
