import AppModel from 'scripts/models/app';
import AppConfig from 'scripts/config';

export default class User extends AppModel {
  constructor(...args) {
    this.urlRoot = 'users';

    this.validation = {
      'user.name': {
        required: () => { return this.isSignup; }
      },
      'user.email': {
        pattern: 'email',
        required: true
      },
      'user.password': {
        required: true
      },
      'user.password_confirmation': {
        equalTo: 'user.password',
        required: () => { return this.isSignup; }
      }
    };

    super(...args);
  }

  signIn() {
    this.isSignup = false;
    return this.send(`${this.url()}/sign_in`);
  }

  signUp() {
    this.isSignup = true;
    return this.send(`${this.url()}/sign_up`);
  }

  send(url) {
    let deferred = $.Deferred();

    if (this.isValid(true)) {
      this.save(null, {
        url,
        success(data) {
          deferred.resolve(data);
        },
        error(data) {
          deferred.reject(data);
        }
      });
    }
    else {
      deferred.reject();
    }

    return deferred.promise();
  }
}
