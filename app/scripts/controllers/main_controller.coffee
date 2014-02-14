define [
  'marionette'
  'views/layout'
  'views/content/landing'
  'views/articles/articles_layout'
  'views/header/header_layout'
  'views/article/single_article'
  'views/dashboard/dashboard'
  'models/user_session'
  'models/article'
  'collections/dashboard_articles'
  'collections/articles'
], (
  Marionette, LayoutView, LandingView, ArticlesLayoutView, HeaderLayoutView, SingleArticleView,
  DashboardView, UserSession, Article, DashboardArticles, Articles) ->

  class MainController extends Marionette.Controller
    initialize: ->
      @layout = new LayoutView
      @layout.render()
      @layout.headerRegion.show(new HeaderLayoutView)

    indexPage: ->
      @layout.mainRegion.show(new LandingView)

    logout: ->
      session = UserSession.getInstance()
      session.logout()
      @trigger('logout')

    showDashboard: ->
      articles = new DashboardArticles()
      articles.fetch().then =>
        console.log articles
        @layout.mainRegion.show(new DashboardView(collection: articles))

    showArticles: ->
      articles = new Articles()
      articles.fetch().then =>
        @layout.mainRegion.show(new ArticlesLayoutView({collection: articles}))

    showArticle: (id) ->
      model = new Article({id: id})
      model.fetch().then =>
        @layout.mainRegion.show(new SingleArticleView({model: model}))
