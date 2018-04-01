const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	util = require('util'),
	jsonParser = bodyParser.json(),
	app = express();


app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

const { LogEntries } = require('./models');


// Create dummy data
const setTimeoutPromise = util.promisify(setTimeout);
LogEntries.create('A', 'Lorem ipsum dolor sit amet', 'JavaScript Promises');
setTimeoutPromise(1000, 'a').then((value) => {
	LogEntries.create('B', 'Duis aute irure dolor in reprehenderit', 'Angular');
}).then((value) => {
	setTimeoutPromise(500, 'b').then((value) => {
		LogEntries.create('C', 'Excepteur sint occaecat cupidatat non proident', 'MongoDB');
	});
});


app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/view-logs', (req, res) => {
	res.sendFile(`${__dirname}/views/logs.html`);
});

app.get('/add-log', (req, res) => {
	res.sendFile(`${__dirname}/views/addLog.html`);
});

app.get('/view-log/:logId', (req, res) => {
	res.sendFile(`${__dirname}/views/viewLog.html`);
});

app.get('/edit-log/:logId', (req, res) => {
	res.sendFile(`${__dirname}/views/editLog.html`);
});

// get all of your posts
app.get('/logEntries', (req, res) => {
	res.json(LogEntries.get());
});

// get an individual post
app.get('/logEntries/:logId', (req, res) => {
	res.json(LogEntries.get(req.params.logId));
});

app.post('/nextLogEntry', jsonParser, (req, res) => {
	console.log('req.body', req.body);
	LogEntries.setNextEntry(req.body);
	res.status(201).json(req.body);
});

app.get('/nextLogEntry', (req, res) => {
	res.json(LogEntries.getNextEntry());
});

app.post('/logEntries', jsonParser, (req, res) => {
	console.log('POST req', req)
	const entry = LogEntries.create(req.body.title, req.body.content, req.body.tag);
	res.status(201).json(entry);
});

app.put('/logEntries/:logId', jsonParser, (req, res) => {
	const revisedEntry = LogEntries.update({
		id: req.params.logId,
		title: req.body.title,
		content: req.body.content,
		publishDate: req.body.publishDate,
		tag: req.body.tag
	});
	console.log('revisedEntry', revisedEntry)
	res.status(200).json(revisedEntry);
});

app.delete('/logEntries/:logId', (req, res) => {
	LogEntries.delete(req.params.logId);
	console.log(`Deleted log entry \`${req.params.logId}\``)
	res.status(204).end();
});

// if no routes are hit
app.use((req, res) => {
	res.sendStatus(404);
});


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
