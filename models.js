mongoose = require('mongoose');

// Question: Should I use this from thinkful example?:
// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
// mongoose.Promise = global.Promise;


// Question: is this line necessary?
const Schema = mongoose.Schema;

const LogSchema = new Schema({
	title: String,
	content: String,
	publishDate: Date,
	tag: String
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