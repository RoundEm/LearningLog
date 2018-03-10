const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

const { JournalEntries } = require('./models');

app.get('/', (req, res) => {
	res.sendFile(_dirname, 'public/index.html');
});

// get all of your posts once you login
app.get('/journalEntries', (req, res) => {
	res.json(JournalEntries.get());
});

// get an individual post
app.get('/journalEntry/:entry_id', (req, res) => {
	res.json(JournalEntries.get(req.params.entry_id));
});

app.post('/journalEntries', jsonParser, (req, res) => {

});

app.put('/journalEntries/:entry_id', jsonParser, (req, res) => {

});

app.delete('/journalEntries/:entry_id', (req, res) => {

});


JournalEntries.create('Title A', 'Lorem ipsum dolor sit amet');
JournalEntries.create('Title B', 'Duis aute irure dolor in reprehenderit ');
JournalEntries.create('Title C', 'Excepteur sint occaecat cupidatat non proident');




let server;

function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		server = app.listen(port, () => {
			console.log(`App is listening on port ${port}`);
			resolve(server);
		})
			.on('error', err => {
				reject(err);
		});
	});
}

function closeServer() {
	return new Promise((resolve, reject) => {
		console.log('closing server');
		server.close(err => {
			if (err) {
				reject(err);
				// so we don't also call `resolve()`
				return;
			}
			resolve();
		});
	});
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
	runServer().catch(err => console.log(err));
}

module.exports = { runServer, closeServer, app };