module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      main: {
        options: {
          process: function(content, srcpath){
            if(srcpath.indexOf('grunt') != -1){
              return false;
            }
            return content;
          }
        },
        files: [
          {
            expand: true,
            src: ['./node_modules/**'],
            dest: './webkitbuilds/app/win'
          }
        ]
      }
    },
    remove: {
      options: {
        trace: true
      },
      dirList: ['./webkitbuilds']
    },
    nodewebkit: {
      options: {
          platforms: ['win','osx', 'linux64'],
          buildDir: './webkitbuilds', // Where the build version of my node-webkit app is saved
      },
      src: ['./*'] // Your node-webkit app
    },
    watch: {
      scripts: {
        files: ['*.js', 'index.html'],
        tasks: ['remove', 'nodewebkit']
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-remove');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['remove', 'nodewebkit']);
}