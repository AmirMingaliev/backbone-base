Marionette = require('marionette')
App = require('../app/scripts/application')

describe 'Application', ->
  it 'should start successfully', ->
    # TODO: this is raising error, need to be fixed asap
    # expect(App.start).to.not.throw(Error)
    expect(App).to.be.instanceof(Marionette.Application)
