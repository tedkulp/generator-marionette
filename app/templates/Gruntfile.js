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
                    out: 'build/scripts/app.js',
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
                    cwd: '<%= bowerDirectory %>',
                    src: [
                        '**/*',
                    ]
                }]
            }
        },
        symlink: {
            js: {
                dest: '.tmp/scripts/<%= bowerDirectory %>',
                src: '<%= bowerDirectory %>',
                options: {type: 'dir'}
            }
        },
    });

    grunt.registerTask('build', [
        'clean:dist',
        'coffee:dist',
        'copy:js',
        'symlink:js',
        'requirejs:dist',
        'copy:dist'
    ]);
};
