var app = {},
    path = require('path');

// require(path.resolve('./config/_settings'))(app);
// require(path.resolve('./config/environment/development'))(app);

var gulp        = require('gulp'),
    nodemon     = require('gulp-nodemon');


// DEFAULT TASK, HANDLES ALL BASIC SERVER STUFF
gulp.task('default', ['nodemon'], function () {
});



// NODEMON
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ext: 'js, jade, styl',
    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
    'execMap': {
      'js': 'iojs'
    }
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
  });
});
