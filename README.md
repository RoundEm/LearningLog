# Log & Learn: Thinkful Capstone Project #2
This app is aimed toward being a simple and easy-to-use learning aid that allows a user to record log entries that detail reflections and progress made when learning a new subject. Each log entry can be categorized under a specific type of post (e.g. Concepts, Questions, Needs Improvement, etc), which allows for easy organization and filtering. You can also sort logs by log title or metadata. For a list of enhancements that I'd like to add in the future please see bottom of README. 

### Link to live app: https://log-and-learn.herokuapp.com/

## The app was built using the following technologies/methodologies:
* Javascript/jQuery
* Express.js/Node.js
* Mongoose/MongoDB
* RESTful API
* HTML
* CSS
* Mocha/Chai/Chai-http
* Responsive Design
* Accessibility
* TravisCI

## Images of App:
![alt text](/public/AppScreenshots/Home.png "Home page")
![alt text](/public/AppScreenshots/Log_Entries.png "View Log Entries page")
![alt text](/public/AppScreenshots/Add_Log_Entry.png "Add Log page")
![alt text](/public/AppScreenshots/View_Log_Entry.png "View Log page")
![alt text](/public/AppScreenshots/Edit_Log_editing.png "Edit Log page")

## API Endpoints:

**GET /logEntries -** Returns all saved log entries

**GET /logEntries/:logId -** Returns an individual log entry

**POST /logEntries -** Create a new log entry

**PUT /logEntries/:logId -** Update a specific log entry

**DELETE /logEntries/:logId -** Remove a specific log entry

## Features I'd like to add in the future:
* User authentication
* Integrate with a WYSIWYG editor to allow formatting of log entries
* Allow user to upload attachments to log entries
* Integration with a messaging or email API so that the app can send notifications to the user containing prior log entries in spaced repitition to assist with retention and knowledge refinement
* Search logs by keywords
* Allow user to create different Log sets so different subjects can be separated out

