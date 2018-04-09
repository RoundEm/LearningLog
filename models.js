mongoose = require('mongoose');

// Question: Should I use this from thinkful example?:
// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
// mongoose.Promise = global.Promise;


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
		type: String, 
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