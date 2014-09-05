module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

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
    shell: {
      patchApp: {
        command: [
          'cd webkitbuilds/app/linux32',
          'sed -i \'s/udev\.so\.0/udev.so.1/g\' app',
          'cd ..',
          'cd linux64',
          'sed -i \'s/udev\.so\.0/udev.so.1/g\' app',
        ].join('&&'),
        options: {
          callback: function(err, stdout, stderr, cb){
            cb();
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-remove');


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['remove', 'nodewebkit', 'copy', 'shell:patchApp']);
}