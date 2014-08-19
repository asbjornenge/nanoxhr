var jsdom      = require("jsdom").jsdom;
environment    = 'localtest'
document       = jsdom('');
window         = document.createWindow();
require('./spec.js')
