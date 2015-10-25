import App from 'scripts/application';
import AppConfig from 'scripts/config';

export default class AppModel extends Backbone.NestedModel {
  constructor(...args) {
    this.idAttribute = `${this.constructor.name.toLowerCase()}.id`;
    this.urlRoot = `${AppConfig.apiPath}/${_.result(this, 'urlRoot')}`;

    super(...args);

    this.listenTo(this, 'error', this.handleErrors);
  }

  handleErrors(model, response) {
    let message = 'Server error has occured';
    let responseError = response.responseJSON.error;

    if (responseError) {
      let { validations, error } = responseError;

      if (validations) {
        return this.trigger('validation:invalid', validations);
      }

      if (error) message = error;
    }

    App.vent.trigger('notification:show', {
      message,
      type: 'danger'
    });
  }
}
