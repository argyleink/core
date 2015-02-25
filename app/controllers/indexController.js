'use strict';

// DEFAULT/INDEX PAGE
exports.index = function *(app, view) {

  yield view.render('index', {
    title : app.name,
    site: app
  });

};
