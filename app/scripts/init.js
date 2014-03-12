require.config({

    baseUrl: "/scripts",

    /* starting point for application */
    deps: ['backbone.marionette', 'backbone.auth', 'bootstrap', 'jqueryui', 'fullcalendar', 'main'],


    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'jqueryui':{
            deps: ['jquery'],
            exports: 'jquery'
        },
        'fullcalendar':{
            deps: ['jquery', 'jqueryui'],
            exports: 'jquery'
        },
        qs:{
            exports:'qs'
        },
        ms:{
            exports:'ms'
        },
        'backbone.localstorage':{
            exports:'backbone.localstorage'
        }
    },

    paths: {
        ms: '../bower_components/ms/ms',
        qs: '../bower_components/qs/qs',
        superagent: '../bower_components/superagent/superagent',
        async: '../bower_components/async/lib/async',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        'backbone.auth': '../bower_components/backbone.auth/index',
        underscore: '../bower_components/underscore-amd/underscore',
        'underscore.string': '../bower_components/underscore.string/lib/underscore.string',
        'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localstorage',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',


        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: "../templates",

        'fullcalendar': '../bower_components/fullcalendar/fullcalendar',
        'jqueryui': '../bower_components/jquery-ui-draggable/jquery-ui-draggable',

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs'
    },

    hbs: {
        disableI18n: true
    }
});
