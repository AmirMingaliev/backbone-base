gulp = require('gulp')
runSequence = require('run-sequence')

gulp.task 'test', ->
  runSequence(
    [
      'copy'
    ]
    'karma'
  )
