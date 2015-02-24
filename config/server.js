'use strict';

module.exports = function(app) {


  // >  - - - - - - - - <
  // >  STATIC FILES    <
  // >  - - - - - - - - <


  var serve = require('koa-static');
  app.use( serve( app.config.root + '/public/') );


  // >  - - - - - - - - <
  // >  HTML TEMPLATES  <
  // >  - - - - - - - - <

  // HANDLEBARS
  if ( app.config.engines.html.template === 'handlebars' ) {

    let htmlEngine = require('koa-hbs');

    app.use(htmlEngine.middleware({
      viewPath: app.base + '/app/views',
    }));

  // JADE
  } else if ( app.config.engines.html.template === 'jade' ) {

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

    let htmlEngine = require('koajs-nunjucks');
    app.use( htmlEngine(app.base + '/app/views', {}) );

  // FLAT HTML (DOESN'T WORK YET)
  } else {
    let htmlEngine = false;
  }


  // >  - - - - - - - - <
  // >  CSS PROCESSORS  <
  // >  - - - - - - - - <


  // STYLUS
  if ( app.config.engines.css.template === 'stylus' ) {

    console.log('INFO: '.blue + 'setting stylus as css processor');

    var stylus = require('koa-stylus');

    app.use(stylus({
      src: app.base + '/public/css',
      dest: app.base + '/public/css'
    }));

  } else if ( app.config.engines.css.template === 'sass' ) {

    console.log('INFO: '.blue + 'setting sass as css processor');

    var sass = require('koa-sass');
    app.use(sass(app.base + '/public'));

  } else if ( app.config.engines.css.template === 'less' ) {

    console.log('INFO: '.blue + 'setting less as css processor');

    var less = require('koa-less');
    app.use(less(app.base + '/public'));

  }


};
