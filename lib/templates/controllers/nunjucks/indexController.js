'use strict';

module.exports = function *(pog) {

  return yield pog.render('index.nj', {
    title : pog.app.name,
    site: pog.app
  });

};
