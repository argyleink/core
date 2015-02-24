'use strict';

const koala    = require('koala'),
      app      = koala();
      app.base = __dirname;

require('colors'); // PRETTY CONSOLE LOGGING
require('fs'); // FILE SYSTEM
require(__dirname + '/config/_settings')(app); // MAIN APP SETTINGS
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // SET DEFAULT ENVIRONMENT

let pog = require('./lib/pog')(app); // INCLUDE POG LIB
pog.inform(app, 'start'); // START UP MESSAGE

// REQUIRED SETTINGS & CONFIG FILES
require(__dirname + '/config/environment/' + process.env.NODE_ENV)(app); // ENVIRONMENT SPECIFIC SETTINGS
require(__dirname + '/config/server')(app, pog); // VIEW SETTINGS
require('pog-router')(app); // INCLUDE AUTO ROUTER


// START THE APP BY LISTEN ON <PORT>
if (!module.parent) app.listen( process.env.PORT || app.config.port, function( err ) {

  if ( !err ) { // IF THERE'S NO ERRORS
    pog.inform(app, 'done');
  } else { // IF SOMETHING WENT WRONG!
    pog.inform(app, 'error', err);
  }

});
