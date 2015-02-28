'use strict';

var os = require('os');
    require('colors');

module.exports = function (app) {

  // global settings
  app.domain = 'mydomain.com';
  app.env = 'production';
  app.address = app.config.protocol + app.domain + '/'; // base url

  // directories
  app.dir = {
    css : app.address + 'css/',
    img : app.address + 'img/',
    lib : app.address + 'lib/',
    js : app.address + 'js/'
  };

  console.log('INFO:'.blue + ' ' + app.env + ' config loaded' );

};
