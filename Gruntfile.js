module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        php: {
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 5000,
                    base:'./public/',
                    keepalive: true,
                    directives: {
                        'error_log': require('path').resolve('logs/error.log'),
                        'access_log': require('path').resolve('logs/access.log')
                    }
                }
            }
        },

        stylus: {
            dev: {
                files: {
                    "public/app.css": "public/app.styl"
                }
            }
        },
        wiredep: {
          target: {
            src: 'public/index.html',
            ignorePath: 'public/',
            exclude: []
          }
        },
        useminPrepare: {
          html: ['public/index.html'],
          css: ['dist/*.css'],
          js: ['dist/*.js'],
          options: {
            dest: 'dist',
            flow: {
              html: {
                steps: {
                  js: ['concat', 'uglifyjs'],
                  css: ['cssmin']
                },
                post: {}
              }
            }
          }
        },
        uglify: {
          options: {
            mangle: false
          }
        },
        usemin: {
    			html: ['dist/*.html'],
    			css: ['dist/*.css'],
    			js: ['dist/*.js'],
        },
        cdnify: {
    			dist: {
    				html: ['dist/*.html']
    			}
    		},
        copy: {
    			dist: {
    				files: [{
    					expand: true,
    					dot: true,
    					cwd: 'public',
    					dest: 'dist',
    					src: [
    						'*.{ico,png,txt,php}',
    						'.htaccess',
    						//'bower_components/**/*',
    						'assets/*.png',
                '!assets/toEdit*.png',
    						'index.html'
    					]
    				}, {
    					expand: true,
    					cwd: 'public/bower_components/semantic-ui/dist/themes',
    					dest: 'dist/themes',
    					src: [
    						'**/assets/fonts/icons.*'
    					]
    				}, {
    					expand: true,
    					cwd: '.tmp/images',
    					dest: 'dist/assets/images',
    					src: ['generated/*']
    				}]
    			},
        },
        jade: {
    			compile: {
    				options: {
    					data: {
    						debug: false
    					}
    				},
    				files: [{
    					expand: true,
    					cwd: 'public',
    					src: [
    						'*.jade'
    					],
    					dest: 'public',
    					ext: '.html'
    				}]
    			}
    		},


        'gh-pages': {
          options: {
            base: 'dist',
            dotfiles: true
          },
          src: ['**']
        },
        concurrent: {
    			default: [
    				'watch',
    				'php:dev',
    			]
        },
        watch: {
            jade: {
            				files: ['public/*.jade'],
            				tasks: ['jade']
            			},
            styles: {
                files: [
                  'public/app.styl',
                  'public/**/*.styl'],
                tasks: ['stylus:dev'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
      				files: ['Gruntfile.js']
      			},
            livereload: {
      				files: [
                '{.tmp,public}/*.html',
                '{.tmp,public}/*.php',
      					'{.tmp,public}/*.css',
      					'{.tmp,public}/*.js',
      					'public/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
      				],
      				options: {
      					livereload: true
      				}
      			}
        },
        clean: {
    			dist: {
    				files: [{
    					dot: true,
    					src: [
    						'.tmp',
                'public/*.html',
                'public/{app,components}/**/*.html',
                'public/app.css',
    						'dist/*',
    						'!dist/.git*'
    					]
    				}]
    			},
    			tmp: {
    				files: [{
    					dot: true,
    					src: [
    						'.tmp',
                'public/*.html',
                'public/{app,components}/**/*.html',
                'public/app.css',
    					]
    				}]
    			}
    		}
    });


    // Tasks.
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-google-cdn');

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('default', [
        'clean:tmp',
        'jade',
        'stylus:dev',
        //'wiredep',
        'concurrent',
        'clean:tmp'
      ]);

    grunt.registerTask('build', [
        'clean:tmp',
        'clean:dist',
        'jade',
        'stylus:dev',
        //'wiredep',
        'useminPrepare',
        'concat:generated',
        'copy:dist',
        //'cdnify',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'gh-pages',
        'clean:tmp'
      ]);
};
