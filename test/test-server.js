const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const { runServer, closeServer, app } = require('../server');
const { seedLogs } = require('../seeder');
const { Log } = require('../models');

function tearDownDb() {
	console.log('Removing database');
	return mongoose.connection.dropDatabase();
}

describe('My app', () => {

	// Q: Should i pass test Db to runServer like thinkful example?
	before(() => {
		return runServer();
	});

	beforeEach((done) => {
		const addSeedDataToDb = seedLogs(Log);
		addSeedDataToDb.then((logs) => {
			done(); 
		});
	});

	afterEach(() => {
		return tearDownDb();
	});

	after(() => {
		return closeServer();
	});

	describe('GET endpoint', () => {
		it('should return all logs', () => {
			return chai.request(app)
				.get('/logEntries')
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('array');
					expect(res).to.be.json;
					res.body.forEach((log) => {
						expect(log).to.be.a('object');
						expect(log).to.include.keys('id', 'title', 'content', 'tag', 'publishDate');
					});
				});
		});	
	});
	describe('GET endpoint', () => {
		it('should list the correct log on GET by ID', () => {
			let id = '';
			return Log
				.findOne()
					.then((log) => {
						id = log._id;
						return chai.request(app) 
							.get(`/logEntries/${id}`)
							.then((res) => {
								expect(res).to.have.status(200);
								expect(res.body).to.be.a('object');

								// what else should I test for?
							});
					});
		});
	});
	describe('POST endpoint', () => {
		it('should create a new log with the required fields', () => {

			// should i change this to use generateLogData() instead??
			const newTestLog = {
				title: 'POST test title',
				content: 'POST test content',
				tag: 'POST test tag'
			};
			return chai.request(app)
				.post('/logEntries')
				.send(newTestLog)
				.then((res) => {
					expect(res).to.have.status(201);
					expect(res).to.be.json;
					expect(res.body).to.be.a('object');

					// expect(res.body.publishDate).to.be.a('date');
					expect(res.body).to.include.keys('id', 'title', 'content', 'tag', 'publishDate');

					// check if this is working correctly
					expect(res.body.title).to.equal(newTestLog.title);
					expect(res.body.content).to.equal(newTestLog.content);
					expect(res.body.tag).to.equal(newTestLog.tag);
				});
		});
	});
	describe('PUT endpoint', () => {
		it('should update the correct log data', () => {
		const logToUpdate = {
				title: 'PUT test title',
				content: 'PUT test content',
				tag: 'PUT test tag'
			};	
			return Log
				.findOne()
					.then((log) => {
						logToUpdate.id = log._id;
						return chai.request(app)
							.put(`/logEntries/${log._id}`)
							.send(logToUpdate)
					})
					.then((res) => {
						expect(res).to.have.status(204);
						expect(res.body).to.be.a('object');
						return Log.findById(logToUpdate.id);
					})
					.then((log) => {
						expect(log.title).to.equal(logToUpdate.title);
						expect(log.content).to.equal(logToUpdate.content);
						expect(log.tag).to.equal(logToUpdate.tag);
					});
		});
	});
	describe('DELETE endpont', () => {
		it('should remove a log by ID', () => {
			let log;
			return Log
				findOne()
					.then((_log) => {
						return chai.request(app).delete(`/logEntries/${log.id}`);
					})
					.then((res) => {
						expect(res).to.have.status(204);
						return Log.findById(log.id);
					})
					.then((_log) => {
						expect(_log).to.be.null;
					});
		});
	});	
});


