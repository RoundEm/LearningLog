const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const util = require('util');
const jsonParser = bodyParser.json();
const app = express();
const mongoose = require('mongoose');

const { DB_URL, PORT } = require('./config');

mongoose.connect(DB_URL);

// mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('common'));
}   

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const { Log } = require('./models');

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/view-logs', (req, res) => {
	res.sendFile(`${__dirname}/views/viewLogs.html`);
});

app.get('/add-log', (req, res) => {
	res.sendFile(`${__dirname}/views/addLogs.html`);
});

app.get('/view-log/:logId', (req, res) => {
	res.sendFile(`${__dirname}/views/viewLog.html`);
});

app.get('/edit-log/:logId', (req, res) => {
	res.sendFile(`${__dirname}/views/editLog.html`);
});

// get all of your posts
app.get('/logEntries', (req, res) => {
	Log.find({})
		.then((logs) => {
			res.json(logs.map((log) => {
				return log.serialize();
			}));
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json(error);
		});
});

// get an individual post
app.get('/logEntries/:logId', (req, res) => {
	Log.findById(req.params.logId)
		.then((log) => {
			res.json(log.serialize());
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json(error);
		});
});

app.post('/logEntries', jsonParser, (req, res) => {
	Log.create(req.body)
		.then((log) => {
			res.status(201).json(log.serialize());
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json(error);
		});
});

app.put('/logEntries/:logId', jsonParser, (req, res) => {
	Log.findByIdAndUpdate(req.params.logId, {$set: req.body})
		.then((log) => {
			res.status(204).end();
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json(error);
		});
});

app.delete('/logEntries/:logId', (req, res) => {
	Log.findByIdAndRemove(req.params.logId)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json(error);
		});	
});

// if no routes are hit
app.use((req, res) => {
	res.sendStatus(404);
});


let server;

function runServer() {
	const port = PORT;
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
