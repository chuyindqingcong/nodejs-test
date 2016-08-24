var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie',MovieSchema);
var cookieSession = require('cookie-session');

module.exports = Movie