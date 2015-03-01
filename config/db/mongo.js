module.exports = function (app) {

  require('colors'); // PRETTY CONSOLE LOGGING

  app.log('INFO: '.blue + 'using ' + 'mongodb'.yellow + ' as pog database.');

  const db = require('mongoose');

};
