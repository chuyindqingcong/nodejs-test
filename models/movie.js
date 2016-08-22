var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie',MovieSchema);

modult.exports = Movie