// THIS FILE IS AUTO-INCLUDED BY SERVER.JS
// IF YOU WANT TO USE ANY CUSTOM ROUTES ON TOP OF THE AUTO ROUTER, THEY CAN GO HERE

'use strict';

module.exports = function(app) {

	const _ = require('koa-route'),
		colors = require('colors'),
		fs = require('fs');

	return {

		load : function(name, schema) {

			try {

				// IF SCHEMA ISN'T AN OBJECT, ASSUME ONLY MODEL NAME WAS PROVIDED AND SET DEFAULTS
				if (typeof schema !== 'object') {

					schema = {
						base: '',
						methods: {
							create: 'post',
							read: 'get',
							update: 'post',
							delete: 'delete'
						}
					};

				}

				// SET DEFAULT BASE PATH IF NOT SPECIFIED
				if (typeof schema.base !== 'string' || schema.base === '/') {
					schema.base = '';
				}

				// SET DEFAULT METHODS IF NOT SPECIFIED
				if (typeof schema.methods !== 'object') {
					schema.methods = {
						create: 'post',
						read: 'get',
						update: 'post',
						delete: 'delete'
					};
				}

        // LOOP THROUGH EACH METHOD, CREATE A ROUTE AND LOAD CONTROLLER
				Object.keys(schema.methods).forEach(function(key) {

					let action = key,
						base = schema.base,
						method = schema.methods[key],
						model = name;

          // IF METHOS IS PROVIDED AS A STRING
					if (typeof method !== 'object') {
						method = {
							type: method,
							params: ''
						};
					}

					// SET ROUTE
					app.use(_[method.type]('/' + schema.base + model + '/' + action + '/' + method.params, function*() {

						// PARSE URL PARAMETERS
						var data = [],
  							params = method.params.split(':');
    						params.shift();

						// STORE URL PARAMS IN DATA OBJECT
						for (var index = 0; index < params.length; ++index) {
							data[params[index].split('/').join('')] = arguments[index];
						}

            // SET CONTROLLER FILE
						var file = app.base + '/app/controllers/' + schema.base + model + 'Controller.js';

            // LOAD CONTROLLER IF IT EXISTS
						if (fs.existsSync(file)) {

              // TRY AND LOAD THE CONTROLLER
              try {

                // PASS INFO ABOUT MODEL TO CONTROLLER
                data.pogModel = {
                  action : action,
                  base : base,
                  method : method.type,
                  name : model
                };

                // LOAD CONTROLLER
                yield require(file)[action](this, data);

                // LOG OUR SUCCESS
                app.log('INFO: '.blue + name.yellow + ' model created');

              // THROW AN ERROR IF CONTROLLER CAN'T BE LOADED
              } catch (err) {

                // SET ERROR MESSAGE
								var message = 'Error in controller: ' + file + '\n\n';
								message = message + 'The file was found, but was not properly formatted and could not be loaded. ';
								message = message + 'Expected to find something like:\n\n';
								message = message + 'exports.' + action + '  = function *(pog) {\n';
								message = message + '  return yield pog.render(\'index\', {\n';
								message = message + '    title : pog.app.name,\n';
								message = message + '    site: pog.app\n';
								message = message + '  });\n';
								message = message + '});\n';

                // THROW 500 ERROR
								yield app.pog.throwError({
									code : 500,
									pog : this,
									title : 'Invalid controller',
									message : message
								});
							}

            // THROW AN ERROR IF CONTROLLER DOES NOT EXIST
						} else {

              // THROW 500 ERROR
              yield app.pog.throwError({
								code : 500,
								pog : this,
								title : 'Controller not found',
								message : 'Could not load the requested controller: ' + file,
							});

						}

					}));

				});


      // THROW AN ERROR IF TRY TO ADD MODEL FAILS
			} catch (err) {

        // LOG THE ERROR BUT TRY TO CONTINUE
				app.log('ERROR: '.red + 'could not create the model. Please double check your syntax');
				app.log('HINT: '.red + err);
				app.log(' ');

			}

			return;
		}

	};


};
