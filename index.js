'use strict';

module.exports = function(app) {

  require(__dirname + '/lib/autoRouter')(app); // DEFAULT ROUTES
  require(__dirname + '/lib/errorRouter')(app); // DEFAULT ROUTES

};
