'use strict';

var os = require('os');
    require('colors');

module.exports = function (app) {

  var tesla = require('../../lib/tesla')(app);

  // global settings
  app.domain = 'mydomain.com';
  app.environment = 'production';
  app.url = app.config.protocol + app.domain + '/'; // base url

  // directories
  app.dir = {
    css : app.address + 'css/',
    img : app.address + 'img/',
    lib : app.address + 'lib/',
    js : app.address + 'js/'
  };

  tesla.log('INFO:'.blue + ' ' + app.env + ' config loaded' );

};
