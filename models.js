const uuid = require('uuid');

const JournalEntries = {
	create: function(title, content, publishDate) {
		console.log('Creating new journal entry');
		const entry = {
			id: uuid.v4(),
			title: title,
			content: content,
			publishDate: publishDate || Date.now()
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
		const entryIndex = this.entries.findIndex(post => post.id === revisedEntry.id);
		if (entryIndex > -1) {
			this.entries.splice(entryIndex, 1);
		}
	}
}

function createJournalEntryModel() {
	const storage = Object.create(JournalEntries);
	storage.entries = [];
	return storage;
}

module.exports = { JournalEntries: createJournalEntryModel() };
