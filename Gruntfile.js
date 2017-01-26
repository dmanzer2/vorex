module.exports = function (grunt) {

    var log = function (err, stdout, stderr, cb) {
        if(stdout) {
            grunt.log.writeln(stdout);
        }
        if(stderr) {
            grunt.log.error(stderr);
        }
        cb();
    };

    grunt.initConfig({
      shell: {
          jekyllClean: {
              command: 'jekyll clean',
              options: {
                  callback: log
              }
          },
          jekyllBuild: {
              command: 'jekyll build --draft --incremental JEKYLL_ENV=dev',
              options: {
                  callback: log
              }
          }
        },
        watch: {
          posts:{
              files:[
                  '_config.yml',
                  '*.html',
                  '*.md',
                  '_layouts/**',
                  '_posts/**',
                  '_drafts/**',
                  '_includes/**',
                  'assets/**/*.*',
                  '_sass/**/*.*',
                  'css/**/*.*'
              ],
              tasks: ['shell:jekyllBuild']
          }
        },
        browserSync: {
          dev: {
              bsFiles: {
                src : [
                    '_site/**/*.*'
                ]
              },
              options: {
                watchTask: true,
                server: './_site'
              }
          }
        },
        cssmin: {
          minify: {
            files: [{
              expand: true,
              cwd: 'assets/css',
              src: ['**/*.css', '!**/*.min.css', '**/*.scss'],
              dest: '_site/assets/css',
              ext: '.css'
            }]
          },
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          combine: {
            files: {
              '_site/assets/css/main.css': ['!_site/assets/css/**/*.min.css', '_site/assets/css/**/*.css']
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('build',['shell:jekyllBuild']);
    grunt.registerTask('default', ['build', 'browserSync', 'watch', 'cssmin' ]);
    grunt.registerTask('clean',['shell:jekyllClean']);
};
