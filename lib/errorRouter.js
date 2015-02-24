'use strict';

module.exports = function (app) {

  app.use(function *(next) {

    var controller;

    console.log('INFO: '.blue + 'Error controller loaded'.white);

    if ( this.originalUrl.indexOf('public/') < 0 ) {
      try {

        console.log('status: ' + this.status);

        controller = require(app.base + '/app/controllers/errorController.js');

        console.log('');
        console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
        console.log(' EVERYTHING IS TERRIBLE! '.red);
        console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
        console.log(this.response);
        console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
        console.log('');

        this.status = this.status; // THIS SEEMS SILLY

        // Load exports.status function if it exists, otherwise throw generic error
        if (typeof controller['throw' + this.status] === 'function') {
          yield controller['throw' + this.status](app, this).next();
        } else {
          yield controller.throwGeneric(app, this).next();
        }

      } catch (err) {

        console.log('');
        console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
        console.log(' EVERYTHING IS TERRIBLE! '.red);
        console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
        console.log(err);
        console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
        console.log('');

        this.status = 500;
        this.body = 'Something has gone horrible wrong and I have no idea what to do about it. Sorry :(';
      }
    } else {

      var fs = require('fs');

      if ( !fs.existsSync( app.base + this.originalUrl ) ) {

        try {

          controller = require(app.base + '/app/controllers/errorController.js');

          console.log('');
          console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
          console.log(' EVERYTHING IS TERRIBLE! '.red);
          console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
          console.log(this.response);
          console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
          console.log('');

          this.status = this.status; // THIS SEEMS SILLY

          // Load exports.status function if it exists, otherwise throw generic error
          if (typeof controller['throw' + this.status] === 'function') {
            yield controller['throw' + this.status](app, this).next();
          } else {
            yield controller.throwGeneric(app, this).next();
          }

        } catch (err) {

          console.log('');
          console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
          console.log(' EVERYTHING IS TERRIBLE! '.red);
          console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
          console.log(err);
          console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
          console.log('');

          this.status = 500;
          this.body = 'Something has gone horrible wrong and I have no idea what to do about it. Sorry :(';
          // this.body = this.err;
        }

      }
    }


  });

};