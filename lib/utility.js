module.exports = function () {

  var colors = require('colors'),
      path = require('path');

  return {

    logController : function( file ) {
      console.log('CONTROLLER: '.blue + file);
    },

    parseUrl : function(file) {

      var action, parent, dir = path.dirname(require.main.filename) + '/app/controllers/';
      if ( dir.substr(-1) === '/' ) dir = dir.substr(0, dir.length - 1); // REMOVE TRAILILNG SLASH FROM DIR
      if (file.substr(-1) === '/') file = file.substr(0, file.length - 1); // REMOVE TRAILING SLASH FROM FILE
      if (file.substr(1) === '/') file = file.substring(1); // REMOVE LEADING SLASH FROM FILE
      if (file === '') file = 'index'; // IF FILE IS EMPTY, CALL IT INDEX

      parent = file.split('/');
      parent = parent.splice(0, parent.length - 1).join('/');
      action = file.split('/').pop(); // SAVE ACTION FOR LATER

      return {
        action: action,
        dir: dir,
        file: file,
        parent: parent
      };

    },

    resolveFile : function( segments ) {

      var file,
          fs = require('fs'),
          option = [
            segments.dir + segments.file + 'Controller.js',
            segments.dir + segments.file + '/indexController.js',
            segments.dir + segments.parent + 'Controller.js',
            segments.dir + segments.parent + '/indexController.js'
          ];

      if (fs.existsSync( option[0] )) {

        this.logController( option[0] );

        return {
          found : true, // TELL A CONTROLLER WAS FOUND
          src : option[0], // TELL WHICH CONTROLLER WAS FOUND
          file : segments.file
        };

      } else if (fs.existsSync( option[1] )) {

        this.logController( option[1] );

        return {
          found : true, // TELL A CONTROLLER WAS FOUND
          src : option[1], // TELL WHICH CONTROLLER WAS FOUND
          file : segments.file
        };

      } else {

        // OPTION 03 : controllers/path/to/fileController.js
        if (fs.existsSync(option[2])) {

          this.logController( option[2] );

          return {
            found : true, // TELL A CONTROLLER WAS FOUND
            src : option[2], // TELL WHICH CONTROLLER WAS FOUND
            file : segments.parent
          };

        // OPTION 04 : controllers/path/to/file/indexController.js
      } else if ( segments.action === 'index' && fs.existsSync(option[3])) {

          this.logController( option[3] );

          return {
            found : true, // TELL A CONTROLLER WAS FOUND
            src : option[3], // TELL WHICH CONTROLLER WAS FOUND
            file : segments.parent
          };

        // NO CONTROLLER FOUND :(
        } else {
          return {
            found : false, // TELL A CONTROLLER WAS FOUND
            src : null, // TELL WHICH CONTROLLER WAS FOUND
            file : segments.file
          };
        }

      }

    },

    throwError : function *(err) {

      err.pog.status = err.code;

      if ( typeof err.stack !== 'undefined' ) {
        console.log('ERROR: '.red + err.stack);
      } else {
        console.log('ERROR: '.red + err.message);
      }

      if ( err.pog.app.config.errorReporting === true ) {
        err.pog.errorTitle = err.title;
        err.pog.errorMessage = err.message;
      } else {
        err.pog.errorTitle = 'Internal Server Error';
        err.pog.errorMessage = 'The server has encountered an unexpected error and cannot continue';
      }
      var controller = require(err.pog.app.base + '/app/controllers/errorController.js');

      if ( err.code  === 404 ) {
        return yield controller.throw404(err.pog).next();
      } else if ( err.code  === 500) {
        return yield controller.throw500(err.pog).next();
      } else {
        return yield controller.throwGeneric(err.pog).next();
      }


    }


  };

};
