ArticleItemView = require('../../views/articles/item')

class ArticlesListView extends Marionette.CollectionView
  className: 'articles'
  childView: ArticleItemView

module.exports = ArticlesListView
