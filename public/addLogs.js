'use strict';

function createLogEntry(title, content, tag) {
	const params = {
		title: title,
		content: content,
		tag: tag
	}
	Data.postLog(params);
}

function bindHandlers() {
	$('.logForm').submit(function(event) {
		event.preventDefault();
		console.log('bindSubmitBtn ran')
		let titleTarget = $(this).find('#add-title');
		let titleValue = titleTarget.val();
		let contentTarget = $(this).find('#add-content');
		let contentValue = contentTarget.val();
		let tagTarget = $(this).find('#add-tag');
		let tagValue = tagTarget.val();
		$('.logForm input, .logForm textarea').prop('readonly', true);
		createLogEntry(titleValue, contentValue, tagValue);	
		$('#add-title, #add-content, #add-tag').css('background-color', '#fafafa');
		$('.successMsg').append(`Your log has been saved! You can <a href="/add-log">add another log</a> or <a href="/view-logs">return to your saved logs.`);
	});

	$('#returnBtn').click(function() {
		let answer = confirm('Any unsaved log data will be lost. Do you wish to continue?');
		if (answer) {
			window.location.href = '/view-logs';
		}
	});
}

function initAddLogs() {
	bindHandlers();
}

$(initAddLogs);
