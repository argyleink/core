'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

  app.name = 'Pog JS'; // the name of your app

  app.config = {

    autoRouter : true, // whether or not to use the auto routing system (https://github.com/pogjs/router)

    browserSync : {
      use : true,
      port : 3000, // port to run the server on
    },

    cache : false, // whether to use caching

    cors : false, // enable CORS - https://github.com/evert0n/koa-cors

    debug : true, // enable or disable console logging

    // set your html & css template engine
    engines : {
      html : {
        template : 'jade', // options: (handlebars|jade|nunjucks)
        extension : '.jade' // options: (.hbs|.jade|.js)
      },
      css : {
        template : 'stylus', // options: (stylus|sass|less) - set false to just use vanilla css
        extension : '.styl' // options: (.styl|.sass|.less)
      },
      cssLibrary : false, // options: (axis|bourbon|nib) - set to false for none
    },

    errorReporting : true, // whether to send error message to browser, or display a generic error

    gzip : true, // whether to enable gzip compression

    logging : {
      console : true, // whether to allow tesla to log messages to the node console
      files : true // this doesn't do anything yet, eventually it will write .log files
    },

    port : 1981, // port to run the server on

    prettify : {
      html : true, // whether to pretify html
      css : true, // whether to pretify css
      js : true // whether to pretify js
    },

    polyfills: false, // whether to enable polyfills (https://github.com/polyfills/polyfills)

    protocol : 'http://', // options: (http|https)

    publicDir : './public/', // public directory where images, javascript, css, etc is stored

    root : rootPath, // path to the root of your server

    secret : 'supercalifragilisticexpialidocious', // placeholder for now, will be implemented later

    socket : {
      use: true, // WHETHER TO ENABLE SOCKETS
      port: 1982
    }

  };

  // some default meta settings for <head>
  app.meta = {
    description : '',
    encoding : 'utf-8',
    keywords : '',
    viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
  };

};
