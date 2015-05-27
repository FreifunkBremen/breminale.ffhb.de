module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        php: {
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 5000,
                    base:'./public/',
                    keepalive: true
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
          }
        },
        usemin: {
    			html: ['dist/*.html'],
    			css: ['dist/*.css'],
    			js: ['dist/*.js'],
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
    						'assets/images/{,*/}*.{webp}',
    						'assets/fonts/**/*',
    						'index.html'
    					]
    				}, {
    					expand: true,
    					cwd: 'public/bower_components/semantic-ui/dist/themes',
    					dest: 'dist/app/themes',
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
    						'{app,components}/**/*.jade'
    					],
    					dest: 'public',
    					ext: '.html'
    				}]
    			}
    		},
        ngAnnotate: {
    			dist: {
    				files: [{
    					expand: true,
    					cwd: '.tmp/concat',
    					src: '*/**.js',
    					dest: '.tmp/concat'
    				}]
    			}
    		},

        ngtemplates: {
        			options: {
        				// This should be the name of your apps angular module
        				module: 'breminaleApp',
        				htmlmin: {
        					collapseBooleanAttributes: true,
        					collapseWhitespace: true,
        					removeAttributeQuotes: true,
        					removeEmptyAttributes: true,
        					removeRedundantAttributes: true,
        					removeScriptTypeAttributes: true,
        					removeStyleLinkTypeAttributes: true
        				},
        				usemin: 'app.js'
        			},
        			main: {
        				cwd: 'public',
        				src: ['{app,components}/**/*.html'],
        				dest: '.tmp/templates.js'
        			},
        			tmp: {
        				cwd: '.tmp',
        				src: ['{app,components}/**/*.html'],
        				dest: '.tmp/tmp-templates.js'
        			}
        },
        nggettext_extract: {
    			pot:{
    				files:{'public/po/template.pot':['.tmp/**/*.html','public/index.html']}
    			}
    		},
    		nggettext_compile: {
    			all:{
    				files:{'public/translations.js':['public/po/*.po']}
    			}
    		},
        'gh-pages': {
          options: {
            base: 'dist'
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
            				files: [
            					'public/{app,components}/*',
            					'public/{app,components}/**/*.jade'],
            				tasks: ['jade','nggettext_extract','nggettext_compile']
            			},
            styles: {
                files: ['public/app.styl'],
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
                '{.tmp,public}/index.html',
                '{.tmp,public}/*.php',
      					'{.tmp,public}/{app,components}/**/*.css',
      					'{.tmp,public}/{app,components}/**/*.html',
      					'{.tmp,public}/{app,components}/**/*.js',
      					'!{.tmp,public}{app,components}/**/*.spec.js',
      					'!{.tmp,public}/{app,components}/**/*.mock.js',
      					'{.tmp,public}/translations.js',
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

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-angular-gettext');

    grunt.registerTask('default', [
        'clean:tmp',
        'jade',
        'stylus:dev',
        //'wiredep',
        'nggettext_extract',
        'nggettext_compile',
        'concurrent',
        'clean:tmp'
      ]);

    grunt.registerTask('build', [
        'clean:tmp',
        'clean:dist',
        'jade',
        'stylus:dev',
        //'wiredep',
        'ngtemplates',
        'nggettext_compile',
        'useminPrepare',
        'concat:generated',
        'copy:dist',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'clean:tmp'
      ]);

    grunt.registerTask('extract', ['nggettext_extract']);
    grunt.registerTask('compile', ['nggettext_compile']);
};
