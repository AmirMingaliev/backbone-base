define [
  'marionette'
  'templates'
], (Marionette) ->

  class ContentLandingView extends Marionette.ItemView
    className: 'page-header'
    template: JST['templates/content/landing']