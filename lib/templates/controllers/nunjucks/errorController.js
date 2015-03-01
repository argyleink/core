'use strict';

// GENERIC ERROR
exports.throwGeneric = function *(pog) {

	yield pog.render('errors/default.nj', {
		title : pog.errorTitle,
		error: pog.errorMessage,
		site: pog.app,
		url: pog.request.originalUrl
	});

};


// 404 ERROR
exports.throw404 = function *(pog) {

	yield pog.render('errors/404.nj', {
		title : pog.errorTitle,
		error: pog.errorMessage,
		site: pog.app,
		url: pog.request.originalUrl
	});

};


// 500 ERROR
exports.throw500 = function *(pog) {

	yield pog.render('errors/500.nj', {
		title : pog.errorTitle,
		error: pog.errorMessage,
		site: pog.app,
		url: pog.request.originalUrl
	});


};
