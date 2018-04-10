const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const { runServer, closeServer, app } = require('../server');

describe('My app', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	// beforeEach - clear db
	// afterEach

	it('should list all logs on GET', function() {
		return chai.request(app)
			.get('/logEntries')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.a('array');
				expect(res).to.be.json;
				res.body.forEach(function(log) {
					expect(log).to.be.a('object');
					expect(item).to.include.keys('id', 'title', 'content', 'tag');
				})
			});
	});
	// it('should list a specific log on GET by id', function() {
	// 	return chai.request(app)
	// 		.get('/logEntries/:logId')
	// 		.then(function(res) {
	// 			expect(res).to.have.status(200);
	// 			expect(res.body).to.be.a('object');
	// 		});
	// });
	it('should create a new log on POST', function() {
		return chai.request(app)
			let newTestLog = {
				title: 'test title',
				content: 'test content',
				tag: 'test tag'
			}
			.post('/logEntries')
			.send(newTestLog)
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				// is this even working correctly?? Test still passes when i test for date
				expect(res.body.publishDate).to.be.a('string');
				expect(res.body).to.include.keys('id', 'title', 'content', 'tag', 'publishDate');
			});
	});
	// it('should update a log on PUT', function() {
	// 	return chai.request(app)
	// 		.put('/logEntries/:logId')
	// 		.then(function(res) {
	// 			expect(res).to.have.status(204);
	// 		});
	// });
	// it('should remove a log on DELETE', function() {
	// 	return chai.request(app)
	// 		.delete('/logEntries/:logId')
	// 		.then(function(res) {
	// 			expect(res).to.have.status(204);
	// 		});
	// });
});

