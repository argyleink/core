'use strict';

// GENERIC ERROR
exports.throwGeneric = function *(app, view) {

	this.body = 'Unknown error has occurred';

	yield view.render('errors/404', {
		title : app.err,
		error: app.err,
		url: view.request.originalUrl
	});

};


// 404 ERROR
exports.throw404 = function *(app, view) {

	yield view.render('errors/404', {
		title : app.err,
		error: app.err,
		url: view.request.originalUrl
	});

	// yield;

};


// 500 ERROR
exports.throw500 = function *(app, view) {

	yield view.render('errors/500', {
		title : app.err,
		error: app.err,
		url: view.request.originalUrl
	});

};
