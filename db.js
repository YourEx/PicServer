var mongoose = require('mongoose');
var dbUrl = 'mongodb://@localhost:27017/picochoon';
mongoose.connect(dbUrl);

module.exports = mongoose;