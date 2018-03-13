const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

const { LogEntries } = require('./models');

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/view-logs', (req, res) => {
	res.sendFile(`${__dirname}/views/logs.html`);
});

app.get('/add-log', (req, res) => {
	res.sendFile(`${__dirname}/views/addLog.html`);
});

// get all of your posts
app.get('/logEntries', (req, res) => {
	res.json(LogEntries.get());
});

// get an individual post
app.get('/logEntry/:entry_id', (req, res) => {
	res.json(LogEntries.get(req.params.entry_id));
});

app.post('/logEntries', jsonParser, (req, res) => {
	const entry = LogEntries.create(req.body.title, req.body.content, req.body.tag);
	res.status(201).json(entry);
});

app.put('/logEntries/:entry_id', jsonParser, (req, res) => {
	const revisedEntry = LogEntries.update({
		id: req.params.entry_id,
		title: req.body.title,
		content: req.body.content,
		publishDate: req.body.publishDate,
		tag: req.body.tag
	});
	res.status(204).end();
});

app.delete('/logEntries/:entry_id', (req, res) => {
	JournalEntries.delete(req.params.id);
	console.log(`Deleted log entry \`${req.params.entry_id}\``)
	res.status(204).end();
});


LogEntries.create('Title A', 'Lorem ipsum dolor sit amet', 'JavaScript Promises');
LogEntries.create('Title B', 'Duis aute irure dolor in reprehenderit', 'Angular');
LogEntries.create('Title C', 'Excepteur sint occaecat cupidatat non proident', 'MongoDB');


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
