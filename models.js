const uuid = require('uuid'),
	mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	// id number or string??
	id: {type: Number, required: true},
	title: {type: String, required: true},
	content: {type: String, required: true},
	publishDateTime: {type: String, required: true},
	tag: {type: String, required: true}
});

const LearningLog = mongoose.model('LearningLog', logSchema);

module.exports = { LearningLog };

// const LogEntries = {
// 	create: function(title, content, tag) {
// 		console.log('Creating new log entry');
// 		const entry = {
// 			id: uuid.v4(),
// 			title: title,
// 			content: content,
// 			publishDate: Date.now(),
// 			tag: tag
// 		}
// 		this.entries.push(entry);
// 		return entry;
// 	},
// 	get: function(id=null) {
// 		if (id !== null) {
// 			return this.entries.find(entry => entry.id === id);
// 		}
// 		return this.entries.sort((a, b) => {
// 			return b.publishDate - a.publishDate;
// 		});
// 	},
// 	update: function(revisedEntry) {
// 		const { id } = revisedEntry;
// 		const entryIndex = this.entries.findIndex(entry => entry.id === revisedEntry.id);
// 		if (entryIndex === -1) {
// 			throw `Entry \`${id}\` doesn't exist. Please provide a valid entry`;
// 		}
// 		this.entries[entryIndex] = Object.assign(this.entries[entryIndex], revisedEntry);
// 		return this.entries[entryIndex];
// 	},
// 	delete: function(id) {
// 		const entryIndex = this.entries.findIndex(post => post.entry_id === id);
// 		if (entryIndex > -1) {
// 			this.entries.splice(entryIndex, 1);
// 		}
// 	}
// }

// function createLogEntryModel() {
// 	const storage = Object.create(LogEntries);
// 	storage.entries = [];
// 	return storage;
// }

// module.exports = { LogEntries: createLogEntryModel() };
