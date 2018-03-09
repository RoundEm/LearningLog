const chai = require('chai');
const chaiHttp = require('chai-http');

const { runServer, closeServer, app } = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('My app', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should return 200 status code', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
			});
	});
});