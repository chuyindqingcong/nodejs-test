var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.Types.objectId;

var CommentSchema = new Schema({
	movie:{type:objectId,ref:'Movie'},
	from:{type:objectId,ref:'User'},
	to:{type:objectId,ref:'User'},
	content:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

CommentSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt= Date.now();
	}
	next();
})

CommentSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById:function(id, cb){
		return this.findOne({_id:id}).exec(cb);
	}
}
module.exports=CommentSchema;