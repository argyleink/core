// LIST ALL ITEMS
exports.all = function *(app, view) {

	var tesla = require('../../lib/tesla')(app),
		uri = require('../../lib/uri')(app, app.req),
		teslaDB = require('../../lib/database')(app),
		options = teslaDB.optionsUri( app.req.query ),
		model = require('../models/{model}')(app);

	model.all( options, function *(result) {

		// IF REQUEST IS SUCCESSFUL
		if (result.status === 'success') {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {
				if ( result.data.length > 0 ) {
					this.body = JSON.stringify( result.data );
				} else {
					this.body = JSON.stringify( result );
				}
			} else {

				yield view.render('{model}s/all', {
					title : app.name,
					site: app,
					data: result.data
				});

			}

		// IF REQUEST FAILS
		} else {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result ) );

			} else {
				//Error page
				this.throw(500, 'Invalid controller');
				yield;
	    }

		}


	});

	yield;

};


// LIST ALL ITEMS
exports.create = function *(app, view) {

	var model = require('../models/{model}')(app),
		tesla = require('../../lib/tesla')(app),
		teslaDB = require('../../lib/database')(app),
		options = teslaDB.optionsUri( app.req.query ),
		data = app.req.query;

	model.create( data, function *(result) {

		if (result.status === 'success') {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				// app.res.redirect("/{model}/all?orderBy=_id&order=desc");
				app.res.send( JSON.stringify( result.data ) );

			} else {

				yield view.render('{model}s/create/success', {
					title : app.name,
					site: app,
					url : app.addess + '{model}/find/' + result.data._id,
					data : result.data
				});

	    }


		} else {

			yield view.render('{model}s/all', {
				title : app.name,
				site: app,
				data: result.data
			});

			// Error page
			this.throw(500, 'Invalid controller');
			yield;
		}

	});

	yield;

};


// DELETE ITEM
exports.delete = function *(app, view) {

	var tesla = require('../../lib/tesla')(app),
		uri = require('../../lib/uri')(app, app.req),
		teslaDB = require('../../lib/database')(app),
		options = teslaDB.optionsUri( app.req.query ),
		model = require('../models/{model}')(app),
		query = false,
		get = app.req.query;

	// DELETE WITH GET PARAMS IF THEY EXIST
	if ( tesla.emptyObject( get ) === false ) {
		query = get;
		if (query.limit) query = delete query.limit;

	// IF NO GET PARAMS, PULL ID FROM URI
	} else if( uri.segment(3) !== '' ) {
		query = {
			_id : uri.segment(3)
		};
	}

	if ( query !== false ) {

		model.delete(query, function *(result) {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result ) );

			} else {

				yield view.render('{model}s/delete', {
					title : app.name,
					site: app,
					data: result.data
				});

			}

		});

	} else {

		// Error page
		this.throw(500, 'Invalid controller');
		yield;

	}

}; // END DELETE


// QUERY ITEMS
exports.find = function *(app, view) {

	var tesla = require('../../lib/tesla')(app),
		uri = require('../../lib/uri')(app, app.req),
		teslaDB = require('../../lib/database')(app),
		options = teslaDB.optionsUri( app.req.query ),
		model = require('../models/{model}')(app),
		query = false,
		get = app.req.query;

	// QUERY WITH GET PARAMS IF THEY EXIST
	if ( tesla.emptyObject( get ) === false ) {
		query = get;
		if (query.limit) query = delete query.limit;

	// IF NO GET PARAMS, PULL ID FROM URI
	} else if( uri.segment(3) !== '' ) {
		query = {
			_id : uri.segment(3)
		};
	}

	console.log(query);

	if ( query !== false ) {

		model.find(query, options, function *(result) {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				if ( result.data.length > 0 ) {
					app.res.send( JSON.stringify( result.data ) );
				} else {
					app.res.send( JSON.stringify( result ) );
				}

			} else {

				yield view.render('{model}s/find', {
					title : app.name,
					site: app,
					data: result.data
				});

			}

		});

	} else {

		// Error page
		this.throw(500, 'Invalid controller');
		yield;

	}

	yield;

}; // END UPDATE


// UPDATE ITEM (ONLY WORKS WITH A SPECIFIC ID FOR NOW)
exports.update = function *(app, view) {

	var tesla = require('../../lib/tesla')(app),
		uri = require('../../lib/uri')(app, app.req),
		teslaDB = require('../../lib/database')(app),
		options = teslaDB.optionsUri( app.req.query ),
		model = require('../models/{model}')(app),
		data = false,
		_id = false,
		msg = 'Invalid request',
		get = app.req.query;

	// UPDATE WITH GET PARAMS IF THEY EXIST
	if ( tesla.emptyObject( get ) === false ) {
		data = app.req.query;
	}

	// DETERMINE ID
	if ( uri.segment(3) !== '' && uri.segment(3) !== undefined ) {
		_id = uri.segment(3);
	} else if ( uri.get('_id') !== '' && uri.get('_id') !== undefined ) {
		_id = uri.get('_id');
	} else {
		msg = 'Invalid request: _id is required';
	}

	// If we have data to update
	if ( data !== false && _id !== false ) {

		model.update(_id, data, function *(result) {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result ) );

			} else {

				yield view.render('{model}s/update', {
					title : app.name,
					site: app,
					data: result.data
				});

			}

		});

	} else {

		// Error page
		this.throw(500, 'Invalid controller');
		yield;

	}

	yield;

}; // END UPDATE
