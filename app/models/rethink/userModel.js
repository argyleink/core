module.exports = function (app) {

  const colors = require('colors'),
        r = require('rethinkdbdash')();


  return {

    // FIND ALL ITEMS
    all : function ( options, cb ) {
      app.log('userModel.all');

      r.table('users').get('orphee@gmail.com').run().then(function(user) {
      }).error(function(err) {
        app.log(err);
      });

      return true;
    }

  };

};
