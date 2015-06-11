module.exports = function(grunt) {

 grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        scripts: {
            files: ['routes/*.js'],
            tasks: ['jshint'],
            options: {
                interrupt: true,
                livereload: true,
            },
        }
    },
    jshint: {
      all: [
          'controller/*',
          'routes/*',
          'app.js'
      ]
    }
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.event.on('watch', function(action, filepath, target) {
  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
});

};