// Generated on 2014-02-14 using generator-impress 0.1.2
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    'index.html',
                    'js/*.js',
                    'css/*.scss',
                    'steps/*.html',
                    'steps/list.json'
                ],
                tasks: ['sass'],
            }
        },
        copy: {
            deploy: {
                files: [
                // includes files within path
                  {expand: true, src: ['css/*'], dest: 'dist/', filter: 'isFile'},
                  {expand: true, src: ['index.html'], dest: 'dist/', filter: 'isFile'},
                  {expand: true, src: ['js/*'], dest: 'dist/', filter: 'isFile'},
                  {expand: true, src: ['steps/*'], dest: 'dist/', filter: 'isFile'},
                  {expand: true, src: ['bower_components/**'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },
        'gh-pages': {
          options: {
            base: 'dist'
          },
          src: ['**']
        },

        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        sass: {                              // Task
            dist: {                            // Target
              options: {                       // Target options
                style: 'compressed'
              },
              files: {                         // Dictionary of files
                'css/main.css': 'css/main.scss'       // 'destination': 'source'
              }
            }
          }
    });

    grunt.registerTask('server', ['connect:livereload', 'open', 'watch']);
    grunt.registerTask('deploy', ['copy:deploy', 'gh-pages']);
    grunt.registerTask('default', 'server');
};
