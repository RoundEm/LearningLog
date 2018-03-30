const editFormModel = {
	 
}

function populateEditLogFields() {
	let logContent = editFormModel.content;
	let logTitle = editFormModel.title;
	let logTag = editFormModel.tag;
	$('#edit-content').val(logContent);
	$('#edit-title').val(logTitle);
	$('#edit-tag').val(logTag);
}

function bindHandlers() {
	$('#deleteLog').click(function(event) {
		event.preventDefault();
		console.log('deleteLog ran')
	});
	$('#saveLog').click(function(event) {
		event.preventDefault();
		console.log('saveLog ran')
	});
	$('#edit-content').on('input', function(event) {
		updateEditFormModel('content', event.target.value);
	});
	$('#edit-title').on('input', function(event) {
		updateEditFormModel('title', event.target.value);
	});
	$('#edit-tag').on('tag', function(event) {
		updateEditFormModel('content', event.target.value);
	});
}

function updateEditFormModel(key, value) {
	editFormModel[key] = value;
}

function initEditLog() {
	const logId = window.location.pathname.split('/')[2];
	Data.getLog(logId, function(data) {
		Object.keys(data).forEach(function(key) {
			updateEditFormModel(key, data[key]);
		});
		populateEditLogFields();
	});
	bindHandlers();
}

$(initEditLog);