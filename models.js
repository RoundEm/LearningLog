mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
	title: {
		type: String, 
		min: 2,
		max: 64,
		required: true
	},
	content: {
		type: String, 
		required: true
	},
	publishDate: { 
		type: Date, 
		default: Date.now(),
		required: true
	},
	tag: {
		type: String, 
		required: true
	}
});

LogSchema.methods.serialize = function() {
	return {
		title: this.title,
		content: this.content,
		publishDate: this.publishDate,
		tag: this.tag,
		id: this._id
	}
}

const Log = mongoose.model('Log', LogSchema)

module.exports = { Log };