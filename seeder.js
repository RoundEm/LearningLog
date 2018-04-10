const faker = require('faker')

function seedLogs(Log) {
	const seedData = [];
	for (let i = 0; i < 10; i++) {
		seedData.push(generateLogData());
	}
	return Log.insertMany(seedData);
}

function generateLogData() {
	return {
		title: faker.random.words(3),
		content: faker.random.words(20),
		publishDate: faker.date.past(),
		tag: faker.random.word()
	}
}

module.exports = { seedLogs }