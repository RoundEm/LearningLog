const uuid = require('uuid');

const LogEntries = {
	create: function(title, content, tag) {
		console.log('Creating new log entry');
		const entry = {
			id: uuid.v4(),
			title: title,
			content: content,
			publishDate: Date.now(),
			tag: tag
		}
		this.entries.push(entry);
		return entry;
	},
	setNextEntry: function(entry) {
		console.log('setNextEntry ran');
		this.nextEntry = entry;
		console.log('entry:', entry);
		return entry;
	},
	getNextEntry: function() {
		return this.nextEntry;
	},
	get: function(id = null) {
		if (id !== null) {
			return this.entries.find(entry => entry.id === id);
		}
		return this.entries.sort((a, b) => {
			return b.publishDate - a.publishDate;
		});
	},
	update: function(revisedEntry) {
		const { id } = revisedEntry;
		const entryIndex = this.entries.findIndex(entry => entry.id === revisedEntry.id);
		if (entryIndex === -1) {
			throw `Entry \`${id}\` doesn't exist. Please provide a valid entry`;
		}
		this.entries[entryIndex] = Object.assign(this.entries[entryIndex], revisedEntry);
		return this.entries[entryIndex];
	},
	delete: function(id) {
		const entryIndex = this.entries.findIndex(post => post.entry_id === id);
		if (entryIndex > -1) {
			this.entries.splice(entryIndex, 1);
		}
	}
}

function createLogEntryModel() {
	const storage = Object.create(LogEntries);
	storage.entries = [];
	storage.nextEntry = {};
	return storage;
}

module.exports = { LogEntries: createLogEntryModel() };
