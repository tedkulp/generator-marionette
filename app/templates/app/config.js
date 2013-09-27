require.config({
  paths: {
    jquery                : '<%= bowerDirectory %>/jquery/jquery',
    underscore            : '<%= bowerDirectory %>/underscore/underscore',
    'underscore.string'   : '<%= bowerDirectory %>/underscore.string/dist/underscore.string.min',
    backbone              : '<%= bowerDirectory %>/backbone/backbone',
    'backbone.wreqr'      : '<%= bowerDirectory %>/marionette/public/javascripts/backbone.wreqr',
    'backbone.babysitter' : '<%= bowerDirectory %>/marionette/public/javascripts/backbone.babysitter',
    'backbone.relational' : '<%= bowerDirectory %>/backbone-relational/backbone-relational',
    'backbone.pageable'   : '<%= bowerDirectory %>/backbone-pageable/lib/backbone-pageable',
    marionette            : '<%= bowerDirectory %>/marionette/lib/core/amd/backbone.marionette',
    backgrid              : '<%= bowerDirectory %>/backgrid/lib/backgrid',
    // bootstrap             : '<%= bowerDirectory %>/twitter/bootstrap',
    jade                  : '<%= bowerDirectory %>/require-jade/jade',
    moment                : '<%= bowerDirectory %>/moment/moment',
    app                   : 'app',
    collections           : 'collections',
    lib                   : 'lib',
    models                : 'models',
    templates             : 'templates',
    views                 : 'views'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    'underscore.string': {
      deps: ['underscore'],
      exports: '_.string'
    },
    // bootstrap: {
    //   deps: ['jquery']
    // },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.babysitter': {
      deps: ['backbone']
    },
    'backbone.wreqr': {
      deps: ['backbone', 'backbone.babysitter'],
      exports: 'Backbone.Wreqr'
    },
    'backbone.relational': {
      deps: ['backbone'],
      exports: 'Backbone.RelationalModel'
    },
    // marionette: {
    //   deps: ['backbone', 'backbone.wreqr', 'backbone.babysitter'],
    //   exports: 'Backbone.Marionette'
    // },
    backgrid: {
      deps: ['backbone', 'backbone.pageable'],
      exports: 'Backgrid'
    },
    moment: {
      exports: 'moment'
    }
  },
  deps: [
    // 'jquery',
    // 'bootstrap',
    // 'underscore',
    // 'moment',
    'main'
  ]
});
