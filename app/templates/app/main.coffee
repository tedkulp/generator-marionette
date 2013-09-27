require ['app'], (App) ->
  console.log 'Starting...'

  window.App = App

  Backbone.history.start
    pushState: true

  console.log 'Started'
