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
    						//'assets/*.png',
    						'!assets/toEdit*.png',
    						//'app.{js,css}',
    						'index.html'
    					]
    				}, {
    					expand: true,
    					cwd: 'public/bower_components/font-awesome',
    					dest: 'dist',
    					src: [
    						'fonts/*'
    					]
    				}]
    			},
          inline: {
    				files: [{
    					expand: true,
    					dot: true,
    					cwd: 'public',
    					dest: 'dist',
    					src: [
                'assets/*.png',
    						'!assets/toEdit*.png',
              ]
            }]
          }
        },
        jade: {
    			compile: {
    				options: {
              pretty:true,
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
        useminPrepare: {
          html: ['public/index.html'],
          css: ['public/*.css'],
          js: ['public/*.js'],
          options: {
            dest: 'dist'
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
        inline: {
          dist: {
            options:{
              tag: '',
              cssmin: true,
              uglify: true
            },
            src: 'dist/index.html',
            dest: 'dist/index.html'
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
    			},
          inline:{
            files:[{
              dot: true,
              src: [
                'dist/app.{js,css}',
              ]
            }]
          }
    		}
    });


    // Tasks.
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-inline');

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('serve', [
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
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'copy:dist',
        'usemin',
        'inline:dist',
        'copy:inline',
        'clean:inline',
        'gh-pages',
        'clean:tmp'
      ]);

    grunt.registerTask('default', ['build']);
};
