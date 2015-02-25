'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

  app.name = 'Pog JS'; // the name of your app

  // app.site = {},

  app.config = {

    cache : false, // whether to use caching

    debug : true,

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

    logging : {
      console: true
    },

    port : 1981, // port to run the server on

    prettify : {
      html : true, // whether to pretify html
      css : true, // whether to pretify css
      js : true // whether to pretify js
    },

    protocol : 'http://', // options: (http|https)

    publicDir : './public/', // public directory where images, javascript, css, etc is stored

    root : rootPath, // path to the root of your server

    secret : 'supercalifragilisticexpialidocious', // placeholder for now, will be implemented later

    socket : false // WHETHER TO ENABLE SOCKETS

  };


  // some default meta settings for <head>
  app.meta = {
    description : '',
    encoding : 'utf-8',
    keywords : '',
    viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
  };

};
