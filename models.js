const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
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
		default: Date.now,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	tag: {
		type: String, 
		required: true
	}
});

const Types = {
	concept: 'Concepts',
	question: 'Questions',
	example: 'Examples',
	goal: 'Goals & Objectives',
	improvement: 'Needs Improvement',
	resource: 'Resources',
	analogy: 'Analogies & Connections',
	accomplishment: 'Accomplishments & Inspiration',
	idea: 'New Ideas'
}

LogSchema.methods.serialize = function() {
	return {
		title: this.title,
		content: this.content,
		publishDate: this.publishDate,
		type: Types[this.type] || this.type,
		tag: this.tag,
		id: this._id
	}
}

const Log = mongoose.model('Log', LogSchema)

module.exports = { Log }
