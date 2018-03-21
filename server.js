const express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	util = require('util'),
	jsonParser = bodyParser.json(),
	mongoose = require('mongoose');
	
mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(express.static('public'));

const { LearningLog } = require('./models');
const { PORT, DB_URL } = require('./config')

// // Create dummy data
// const setTimeoutPromise = util.promisify(setTimeout);
// LogEntries.create('A', 'Lorem ipsum dolor sit amet', 'JavaScript Promises');
// setTimeoutPromise(2000, 'a').then((value) => {
// 	LogEntries.create('B', 'Duis aute irure dolor in reprehenderit', 'Angular');
// }).then((value) => {
// 	setTimeoutPromise(2000, 'b').then((value) => {
// 		LogEntries.create('C', 'Excepteur sint occaecat cupidatat non proident', 'MongoDB');
// 	});
// });


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
	LearningLog
		.find()
		.then(logs => {
			res.json({
				logs: logs
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// get an individual post
app.get('/logEntry/:entry_id', (req, res) => {
	LearningLog
		.findById(req.params.entry_id)
		.then(log => res.json(log))
		.catch(err => {
			console.error(err);
				res.status(500).json({message: 'Internal server error'});
		});
});

// QQ: Do I still need jsonParser??
app.post('/logEntries', jsonParser, (req, res) => {
	LearningLog
		.create({
			id: req.body.entry_id,
			title: req.body.title,
			content: req.body.content,
			publishDateTime: req.body.content,
			tag: req.body.tag
		})
		.then(log => res.status(201).json(log))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});

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

let server;

// Prior to mongo refactoring
// function runServer() {
// 	const port = process.env.PORT || 8080;
// 	return new Promise((resolve, reject) => {
// 		server = app.listen(port, () => {
// 			console.log(`App is listening on port ${port}`);
// 			resolve(server);
// 		})
// 			.on('error', err => {
// 				reject(err);
// 		});
// 	});
// }

function runServer(dbUrl, port=PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(dbUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`App is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
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
	runServer(DB_URL).catch(err => console.log(err));
}

module.exports = { runServer, closeServer, app };
