define ['marionette'], (Marionette) ->
  App = new Marionette.Application()

  App.addRegions
    main: '#backbone-container'
    modal: '#page-modal'

  App
