import Session from 'scripts/facades/session';
import FormBehavior from 'scripts/views/behaviors/form';
import routes from 'scripts/helpers/routes';
import template from 'templates/navigation/login';

export default class NavigationLoginView extends Marionette.ItemView {
  constructor(...args) {
    this.className = 'nav navbar-nav navbar-right';
    this.template = template;
    this.model = Session.currentUser();

    this.ui = {
      form: 'form'
    };

    this.events = {
      'submit @ui.form': 'onFormSubmit',
    };

    this.bindings = {
      '[name="user.email"]': {
        observe: 'user.email',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      '[name="user.password"]': {
        observe: 'user.password',
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
      routesHelper: routes
    };

    super(...args);
  }

  onFormSubmit(event) {
    event.preventDefault();
    Session.create();
  }
}
