'use strict';

module.exports = function (app) {

  app.use(function *(next) {

    var fs = require('fs');

    if ( this.originalUrl.indexOf('public/') < 0 ) {

      try {

        var action, ctrl, err, parent,
            colors = require('colors'),
            path = require('path'),
            router = require('koa-router')(),
            dir = path.dirname(require.main.filename) + '/app/controllers/', // SET CONTROLLER DIRECTORY
            file = this.req.url, // SET INITIAL FILE NAME
            debug = true,
            found = false,
            success = false,
            forbidIndex = false;

        if ( dir.substr(-1) === '/' ) dir = dir.substr(0, dir.length - 1); // REMOVE TRAILILNG SLASH FROM DIR
        if (file.substr(-1) === '/') file = file.substr(0, file.length - 1); // REMOVE TRAILING SLASH FROM FILE
        if (file.substr(1) === '/') file = file.substring(1); // REMOVE LEADING SLASH FROM FILE
        if (file === '') file = 'index'; // IF FILE IS EMPTY, CALL IT INDEX

        parent = file.split('/');
        parent = parent.splice(0, parent.length - 1).join('/');
        action = file.split('/').pop(); // SAVE ACTION FOR LATER

        // - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // TRY TO DETERMINE CONTROLLER BASED ON CURRENT URL
        // THIS OBVIOUSLY ONLY WORKS IF A CONTROLLER FILE EXISTS
        // - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // OPTION 01 : app/controllers/actionController.js
        if (fs.existsSync(dir + file + 'Controller.js')) {

          console.log('CONTROLLER: '.blue + dir + file + 'Controller.js');

          found = true; // TELL THE SCRIPT A CONTROLLER WAS FOUND
          ctrl = dir + file + 'Controller.js'; // TELL WHAT CONTROLLER WAS FOUND

        // OPTION 02 :  app/controllers/action/indexController.js
        } else if (fs.existsSync(dir + file + '/indexController.js')) {

          console.log('CONTROLLER: '.blue + dir + file + '/indexController.js' );

          found = true; // TELL THE SCRIPT A CONTROLLER WAS FOUND
          ctrl = dir + file + '/indexController.js'; // TELL WHAT CONTROLLER WAS FOUND

        } else {

          // OPTION 03 : controllers/path/to/fileController.js
          if (fs.existsSync(dir + parent + 'Controller.js')) {

            console.log('CONTROLLER: '.blue + dir + parent + 'Controller.js' );

            found = true; // TELL THE SCRIPT A CONTROLLER WAS FOUND
            ctrl = dir + parent + 'Controller.js'; // TELL WHAT CONTROLLER WAS FOUND
            file = parent;

          // OPTION 04 : controllers/path/to/file/indexController.js
        } else if ( action === 'index' && fs.existsSync(dir + parent + '/indexController.js')) {

            console.log('CONTROLLER: '.blue + dir + parent + '/indexController.js' );

            found = true; // TELL THE SCRIPT A CONTROLLER WAS FOUND
            ctrl = dir + parent + '/indexController.js'; // TELL WHAT CONTROLLER WAS FOUND
            file = parent;

          // NO CONTROLLER FOUND :(
          } else {

            found = false;

          }

        }


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //  IF WE FOUND A CONTROLLER, TRY AND MAKE SURE IT'S VALID
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        if ( found === true ) {

          if (action === file) action = 'index'; // SET ACTION TO INDEX IF EMPTY

          var result,
              controller = require(ctrl); // REQUIRE OUR CONTROLLER FILE

          // FIRST, LOOK FOR EXPORTS.ACTION
          if (typeof controller[action] === 'function') {

            yield controller[action](app, this).next(); // CALL THE RIGHT FUNCTION IN CONTROLLER

          // NEXT, TRY MODULE.EXPORTS
          } else if (typeof controller === 'function') {


            // IF INDEX LISTING IS ALLOWED
            if (forbidIndex === false) {

              yield controller(app, this).next(); // CALL DEFAULT FUNCTION IN CONTROLLER

            //
            } else {
              console.log('405 ERROR THROWN BY ROUTER!');
              this.throw(405, 'index listing not allowed');
              yield;
            }

          // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          //  IF CONTROLLER IS NOT FORMATTED PROPERLY, THROW A 500 ERROR
          // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          } else {
            console.log('500 ERROR THROWN BY ROUTER!');
            this.throw(500, 'Invalid controller');
            yield;
          }



        // - - - - - - - - - - - - - - - - - - - - - - - -
        //  IF CONTROLLER WAS NOT FOUND. THROW A 404 ERROR
        // - - - - - - - - - - - - - - - - - - - - - - - -

        } else {

          try {
            yield next;
          } catch (err) {
            this.status = err.status || 500;
            this.body = err.message;
            this.app.emit('error', err, this);
          }
        }
      } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
      }


    // HANDLE NON CONTROLLER FILES
    } else {

      try {
        console.log('do the next thing');
        yield next;
      } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
      }

    }


  });

};
