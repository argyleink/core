'use strict';

module.exports = function(app, yak) {

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


};
