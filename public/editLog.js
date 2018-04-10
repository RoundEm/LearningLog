'use strict'

const editFormModel = {}

const editLogId = window.location.pathname.split('/')[2];

function populateEditLogFields() {
	let logContent = editFormModel.content;
	let logTitle = editFormModel.title;
	let logTag = editFormModel.tag;
	$('#edit-content').val(logContent);
	$('#edit-title').val(logTitle);
	$('#edit-tag').val(logTag);
}

function handleUpdate(err, response) {
	if (err) {
		return console.log(err);
	} 
	alert('Log was successfully updated');
	window.history.back();
}

function handleDelete(err, response) {
	if (err) {
		return console.log(err);
	} 
	let answer = confirm('Are you sure you want to delete?')
	if (answer) {
		alert('Log was successfully deleted!');
		window.location.href = '/view-logs';
	}
}

function bindHandlers() {
	$('#deleteLog').click(event => {
		event.preventDefault();
		Data.removeLog(editLogId, handleDelete);
	});
	$('#updateLog').click(event => {
		event.preventDefault();
		Data.updateLog(editLogId, editFormModel, handleUpdate);
	});
	$('#edit-content').on('input', event => {
		updateEditFormModel('content', event.target.value);
	});
	$('#edit-title').on('input', event => {
		updateEditFormModel('title', event.target.value);
	});
	$('#edit-tag').on('input', event => {
		updateEditFormModel('tag', event.target.value);
	});
	$('button').focus(function() {
		$(this).css('background-color', '#ffde4d');
	});
	$('button').blur(function() {
		$(this).css('background-color', 'white');
	});
}

function updateEditFormModel(key, value) {
	editFormModel[key] = value;
}

function initEditLog() {
	Data.getLog(editLogId, (err, data) => {
		Object.keys(data).forEach(key => {
			updateEditFormModel(key, data[key]);
		});
		populateEditLogFields();
	});
	bindHandlers();
}

$(initEditLog);