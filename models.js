const uuid = require('uuid');

const LogEntries = {
	create: function(title, content) {
		console.log('Creating new log entry');
		const dateObj = new Date();
		const month = dateObj.getUTCMonth() + 1;
		const day = dateObj.getUTCDate();
		const year = dateObj.getUTCFullYear(); 
		const fullDate = `${month}/${day}/${year}`;
		const entry = {
			id: uuid.v4(),
			title: title,
			content: content,
			publishDate: fullDate
		}
		this.entries.push(entry);
		return entry;
	},
	get: function(id = null) {
		if (id !== null) {
			return this.entries.find(entry => entry.id === id);
		}
		return this.entries.sort((a, b) => {
			b.publishDate - a.publishDate;
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
	return storage;
}

module.exports = { LogEntries: createLogEntryModel() };
