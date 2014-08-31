module.exports = function(grunt){
  grunt.initConfig({
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
        tasks: ['nodewebkit']
      }
    }
  })

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
}