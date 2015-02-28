'use strict';

module.exports = function(app) {


  // >  - - - - - - - - <
  // >  CSS PROCESSORS  <
  // >  - - - - - - - - <

  // SASS
  // Not working with iojs yet. Waiting on node-sass to get io.js compatibility :/
  if ( app.config.engines.css.template === 'sass' ) {
    console.log('INFO: '.blue + 'using sass for css');
    app.use(require('koa-sass')(app.config.root + '/public/css/'));
  }

  // STYLUS
  else if ( app.config.engines.css.template === 'stylus' ) {
    console.log('INFO: '.blue + 'using stylus for css');
    app.use(require('koa-stylus')(app.config.root + '/public/css/'));
  }

  // LESS
  // not working with iojs yet :/
  else if ( app.config.engines.css.template === 'less' ) {
    console.log('INFO: '.blue + 'using less for css');
    app.use(require('koa-less')('./public/css/'));
  }


  // >  - - - - - - - - <
  // >  HTML TEMPLATES  <
  // >  - - - - - - - - <

  // HANDLEBARS
  if ( app.config.engines.html.template === 'handlebars' ) {

    console.log('INFO: '.blue + 'rendering templates with ' + app.config.engines.html.template);

    let htmlEngine = require('koa-hbs');

    app.use(htmlEngine.middleware({
      viewPath: app.base + '/app/views',
      partialsPath:app.base + '/app/views/partials'
    }));

  // JADE
  } else if ( app.config.engines.html.template === 'jade' ) {

    console.log('INFO: '.blue + 'rendering templates with ' + app.config.engines.html.template);

    let htmlEngine = require('koa-jade');

    app.use(htmlEngine.middleware({
      viewPath: app.base + '/app/views',
      debug: app.config.debug,
      cache: app.config.cache,
      pretty: app.config.prettify.html,
      compileDebug: app.config.debug,
      basedir: app.base
    }));

  // NUNJUCKS
  } else if ( app.config.engines.html.template === 'nunjucks' ) {

    console.log('INFO: '.blue + 'rendering templates with ' + app.config.engines.html.template);

    let htmlEngine = require('koajs-nunjucks');
    app.use( htmlEngine(app.base + '/app/views', {}) );

  // FLAT HTML (DOESN'T WORK YET)
  } else {
    let htmlEngine = false;
  }


  // >  - - - - - - - - <
  // >  MISCELLANEOUS   <
  // >  - - - - - - - - <

  // GZIP
  if ( app.config.gzip === true ) app.use( require('koa-gzip')() );

  // ENABLE POLYFILLS
  if ( app.config.polyfills === true ) app.use(require('koa-polyfills')());

  // ENABLE CORS
  if ( app.config.cors === true ) app.use(require('koa-cors')());

  // SERVE STATIC FILES
  app.use( require('koa-static')( app.config.root + '/public/') );




};
