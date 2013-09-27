// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                files: [
                    '{,*/}*.html',
                    '{.tmp,}/styles/{,*/}*.css',
                    '{.tmp,}/scripts/{,*/}*.js',
                    'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 8888,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
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
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'build/*',
                        '!build/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        requirejs: {
            dist: {
                options: {
                    name: 'app',
                    baseUrl: '.tmp/scripts',
                    mainConfigFile: 'scripts/config.js',
                    out: 'build/scripts/config.js',
                    removeCombined: false
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: 'scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
        },
        cssmin: {
            dist: {
                files: {
                    'build/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        'styles/{,*/}*.css'
                    ]
                }
            }
        },
        copy: {
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'scripts',
                    dest: '.tmp/scripts',
                    src: [
                        '{,*/}*.js',
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: 'build',
                    src: [
                        '*.{ico,txt,html}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/*',
                    ]
                },
                {
                    expand: true,
                    dot: true,
                    dest: 'build/scripts/<%= bowerDirectory %>',
                    cwd: 'scripts/<%= bowerDirectory %>',
                    src: [
                        'modernizr/modernizr.js',
                        'requirejs/require.js'
                    ]
                }]
            }
        },
        symlink: {
            js: {
                dest: '.tmp/scripts/<%= bowerDirectory %>',
                src: 'scripts/<%= bowerDirectory %>',
                options: {type: 'dir'}
            }
        },
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                // 'imagemin',
                // 'svgmin',
                // 'htmlmin'
            ]
        },
        compass: {
            options: {
                sassDir: 'styles',
                cssDir: '.tmp/styles',
                imagesDir: 'images',
                javascriptsDir: 'scripts',
                fontsDir: 'styles/fonts',
                importPath: 'scripts/<%= bowerDirectory %>',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'coffee',
            'concurrent:server',
            'livereload-start',
            'connect:livereload',
            // 'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'coffee:dist',
        'copy:js',
        'symlink:js',
        'concurrent:dist',
        'requirejs:dist',
        'cssmin',
        'copy:dist'
    ]);
};
