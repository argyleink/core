'use strict';

module.exports = function *(next) {

  var colors = require('colors'),
      utility = require(__dirname + '/lib/utility')(); // REQUIRE OUR CONTROLLER FILE

  console.log('INFO: '.blue + 'auto router loaded');

  // ATTEMPT TO LOAD THE RIGHT CONTROLLER
  try {

    var segments = utility.parseUrl(this.req.url),
        ctrl = utility.resolveFile(segments);

    segments.file = ctrl.src;

    // IF CONTROLLER IS FOUND
    if ( ctrl.found === true ) {

      if ( segments.action === segments.file) segments.action = 'index'; // SET ACTION TO INDEX IF EMPTY

      var result,
          controller = require(ctrl.src); // REQUIRE OUR CONTROLLER FILE

      // FIRST, LOOK FOR EXPORTS.ACTION
      if (typeof controller[segments.action] === 'function') {
        yield controller[segments.action](this).next();

      // NEXT, TRY MODULE.EXPORTS
      } else if (typeof controller === 'function') {
        yield controller(this).next();

      // IF CONTROLLER HAS A PROBLEM
      } else {

        var stack = 'Error in controller: ' + ctrl.src + '\n\n';
        stack = stack + 'The file was found, but was not properly formatted and could not be loaded. Expected to find:\n\n';
        stack = stack + 'exports.' + segments.action + '  = function *(pog) {\n';
        stack = stack + '  return yield pog.render(\'index\', {\n';
        stack = stack + '    title : pog.app.name,\n';
        stack = stack + '    site: pog.app\n';
        stack = stack + '  });\n';
        stack = stack + '});\n';

        if ( segments.action === 'index' ) {
          stack = stack + '\n';
          stack = stack + 'or\n\n';
          stack = stack + 'module.exports = function *(pog) {\n';
          stack = stack + '  return yield pog.render(\'index\', {\n';
          stack = stack + '    title : pog.app.name,\n';
          stack = stack + '    site: pog.app\n';
          stack = stack + '  });\n';
          stack = stack + '});\n';
        }


        yield utility.throwError({
          code: 500,
          pog: this,
          title: 'Controller Error',
          message: stack,
          stack: stack
        });
      }

    // IF NO CONTROLLER FILE IS FOUND
    } else {
      yield utility.throwError({
        code: 404,
        pog: this,
        title: 'Page not found',
        message: 'The page you requested could not be found: ' + segments.file
      });
    }

  // IF SOMETHING ELSE GOES WRONG
  } catch(err) {

      yield utility.throwError({
        code: 500,
        pog: this,
        title: 'Internal Server Error',
        message: err.message,
        stack: err
      });

  }

};
