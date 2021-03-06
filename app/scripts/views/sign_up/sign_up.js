import App from 'scripts/application';
import User from 'scripts/models/user';
import Session from 'scripts/facades/session';
import Routes from 'scripts/helpers/routes';
import FormBehavior from 'scripts/views/behaviors/form';
import template from 'templates/sign_up/sign_up';

export default class SignUpView extends Marionette.ItemView {
  constructor(...args) {
    this.template = template;
    this.model = new User();

    this.ui = {
      form: 'form'
    };

    this.events = {
      'submit @ui.form': 'signUpNewUser',
    };

    this.bindings = {
      '[name="name"]': {
        observe: 'name',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      '[name="email"]': {
        observe: 'email',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      '[name="password"]': {
        observe: 'password',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      '[name="password_confirmation"]': {
        observe: 'password_confirmation',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      '[name="avatar"]': {
        observe: 'avatar',
        updateView: false
      },
    };

    this.behaviors = {
      form: {
        behaviorClass: FormBehavior,
        tooltip: {
          placement: 'bottom'
        }
      }
    };

    super(...args);
  }

  signUpNewUser(event) {
    event.preventDefault();
    this.model.signUp().done(() => { this.signInNewUser(); });
  }

  signInNewUser() {
    Session.currentUser().set({
      email: this.model.get('email'),
      password: this.model.get('password')
    });
    Session.create().done(() => {
      App.vent.trigger('notification:show', {
        type: 'success',
        message: 'Your account successfully created!'
      });
    });
  }
}
