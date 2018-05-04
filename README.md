# Log & Learn
This app is aimed toward being a simple learning aid that allows a user to record log entries that detail reflections and progress made when learning a new subject. Each log entry can be categorized under a specific type of post (e.g. Concepts, Questions, Needs Improvement, etc), which allows for easy organization and filtering. You can also sort logs by title or metadata. 

The app was built using the following technologies/methodologies:
* Javascript/jQuery
* Express.js/Node.js
* Mongoose/MongoDB
* REST API
* Mocha/Chai/Chai-http
* HTML
* CSS
* Responsive Design

### Link to live app: https://radiant-cove-60627.herokuapp.com/

## API
### Routes:
**GET /logEntries -** Returns all saved log entries

**GET /logEntries/:logId -** Returns an individual log entry

**POST /logEntries -** Create a new log entry

**PUT /logEntries/:logId -** Update a specific log entry

**DELETE /logEntries/:logId -** Remove a specific log entry


## Features I'd like to add:
* User authentication
* Integrate with a WYSIWYG editor to allow formatting of log entries
* Allow user to upload attachments to log entries
* Integration with a messaging or email API so that the app can send notifications to the user containing prior log entries in spaced repitition to assist with retention and knowledge refinement
* Search logs by keywords
