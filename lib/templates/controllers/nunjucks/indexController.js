'use strict';

// DEFAULT/INDEX PAGE
exports.index = function *(app, view) {

  yield view.render('index.nj', {
    title : app.name,
    site: app
  });

};
