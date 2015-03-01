'use strict';

var os = require('os');
    require('colors');

module.exports = function (app) {

  // global settings
  app.domain = 'staging.mydomain.com';
  app.env = 'staging';
  app.address = app.config.protocol + app.domain + '/'; // base url

  // directories
  app.dir = {
    css : app.address + 'css/',
    img : app.address + 'img/',
    lib : app.address + 'lib/',
    js : app.address + 'js/'
  };

  app.log('INFO:'.blue + ' ' + app.env.yellow + ' config loaded' );

};
