import Article from 'scripts/models/article';
import FormBehavior from 'scripts/views/behaviors/form';
import Session from 'scripts/facades/session';
import user from 'scripts/helpers/user';
import template from 'templates/articles/form';

export default class ArticlesFormView extends Marionette.ItemView {
  constructor(...args) {
    this.model = new Article({
      'article.name': Session.currentUser().get('user.name'),
      'article.avatar': Session.currentUser().get('user.avatar')
    });

    this.template = template;

    this.events = {
      'submit form': 'onFormSubmit'
    };

    this.bindings = {
      '[name="article.text"]': {
        observe: 'article.text',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      '[name="article.title"]': {
        observe: 'article.title',
        updateView: false,
        setOptions: {
          validate: true
        }
      }
    };

    this.behaviors = {
      form: {
        behaviorClass: FormBehavior
      }
    };

    this.templateHelpers = {
      userHelper: user
    };

    super(...args);
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.model.isValid(true)) {
      console.log(this.model);
      this.collection.create(this.model, { wait: true });
    }
  }
}
