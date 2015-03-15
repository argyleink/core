'use strict';

exports.all = function *(pog) {

  const model = require( pog.app.base + 'app/models/{name}Model.js');

  return yield pog.render('all.nj', {
    title : pog.app.name,
    site: pog.app
  });

};


exports.create = function *(pog) {

  const model = require( pog.app.base + 'app/models/{name}Model.js');

  return yield pog.render('create.nj', {
    title : pog.app.name,
    site: pog.app
  });

};


exports.delete = function *(pog) {

  const model = require( pog.app.base + 'app/models/{name}Model.js');

  return yield pog.render('delete.nj', {
    title : pog.app.name,
    site: pog.app
  });

};


exports.find = function *(pog) {

  const model = require( pog.app.base + 'app/models/{name}Model.js');

  return yield pog.render('find.nj', {
    title : pog.app.name,
    site: pog.app
  });

};


exports.read = function *(pog) {

  const model = require( pog.app.base + 'app/models/{name}Model.js');

  return yield pog.render('read.nj', {
    title : pog.app.name,
    site: pog.app
  });

};


exports.update = function *(pog) {

  const model = require( pog.app.base + 'app/models/{name}Model.js');

  return yield pog.render('update.nj', {
    title : pog.app.name,
    site: pog.app
  });

};
