import SessionModel from 'scripts/models/session';
import Comments from 'scripts/collections/comments';

export default class Article extends SessionModel {
  constructor(...args) {
    this.urlRoot = 'articles';

    this.defaults = {
      'article.comments_count': 0
    };

    this.validation = {
      'article.text': {
        required: true
      },
      'article.title': {
        required: true
      }
    };

    super(...args);
  }

  parse(response) {
    if (response.comments) {
      this.set('comments', new Comments(response.comments));
      delete response.comments;
    }

    return super.parse(response);
  }
}
