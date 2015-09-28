var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
  runSequence(
    'clean',
    [
      'copy',
      'templates',
      'stylesheets',
      'replace',
      'jshint',
      'jsonlint'
    ],
    'browserify',
    'server',
    'watch'
  );
});