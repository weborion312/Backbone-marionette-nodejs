define(['backbone', 'reqres', 'commands', 'async'], function(Backbone, reqres, commands, async) {
  Backbone.reqres = reqres
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };
  Backbone.sync = function(method, model, options) {
    async.waterfall([

      function(cb) {
        reqres.request('access_token', cb)
      }
    ], function(err, token) {
      if (err) throw new Error('there was an error retrieving the access_token')
      _sync(method, model, options, token)
    })
  }

  function _sync(method, model, options, token) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {
      type: type,
      dataType: 'json'
    };

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {
        model: params.data
      } : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && window.ActiveXObject && !(window.external && window.external.msActiveXFilteringEnabled)) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }
    // add facebook accesstoken to request headers
    options.beforeSend = function(xhr) {
      if (!token) return
      xhr.setRequestHeader('access_token', token.access_token)
      xhr.setRequestHeader('expires_in', token.expires_in)
    }
    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    /**
     * if api returns 401, all requests must include an access_token, therefore we must execute the login:login hook
     */
    xhr.error(function(data) {
      switch (xhr.status) {
        case 401:
          return commands.execute('login:login')
          break;
      }
    })
    xhr.done(function(data) {})
    model.trigger('request', model, xhr, options);

    return xhr;
  };
  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  };
})