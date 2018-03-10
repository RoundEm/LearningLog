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
app.get('/user_id:/blogPosts', (req, res) => {

});

// get an individual post
app.get('/user_id:/blogPosts/:post_id', (req, res) => {

});

app.post('/user_id:/blogPost', (req, res) => {

});

app.put('/user_id:/blogPosts/:post_id', (req, res) => {

});

app.delete('/user_id:/blogPosts/:post_id', (req, res) => {

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