module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: './modules/**',
            dest: './webkitbuilds/app/win'
          },{
            expand: true,
            src: './modules/**',
            dest: './webkitbuilds/app/linux64'
          },{
            expand: true,
            src: './modules/**',
            dest: './webkitbuilds/app/linux32'
          },{
            expand: true,
            src: './modules/**',
            dest: './webkitbuilds/app/osx/app.app/Contents/Resources/app.nw'
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
          platforms: ['win','osx', 'linux64', 'linux32'],
          buildDir: './webkitbuilds', // Where the build version of my node-webkit app is saved
      },
      src: ['./*'] // Your node-webkit app
    },
    watch: {
      scripts: {
        files: ['*.js', 'index.html'],
        tasks: ['remove', 'nodewebkit']
      }
    },
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-remove');


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['remove', 'nodewebkit', 'copy']);
}