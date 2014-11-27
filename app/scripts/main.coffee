require('backbone-routefilter')
require('backbone-stickit')
require('backbone-validation')
require('marionette')
require('bootstrap')
require('jade')

require('scripts/modules/navigation')
require('scripts/modules/landing')
require('scripts/modules/dashboard')
require('scripts/modules/articles')

App = require('scripts/application')

$ -> App.start()