var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('Movie',CommentSchema);

module.exports = Comment