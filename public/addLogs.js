'use strict';

const AddLogs = {
	createLogEntry: function(title, content, tag) {
		console.log('createLogEntry ran');
		const params = {
			title: title,
			content: content,
			tag: tag
		}
		// return $.post('/logEntries', params);
		Data.postLog(params);
	},
	bindSubmitBtn: function() {
		$('.add-log').submit(function(event) {
			event.preventDefault();
			let titleTarget = $(this).find('#add-title');
			let titleValue = titleTarget.val();
			let contentTarget = $(this).find('#add-content');
			let contentValue = contentTarget.val();
			let tagTarget = $(this).find('#add-tag');
			let tagValue = tagTarget.val();
			$('.add-log input, .add-log textarea').prop('readonly', true);
			AddLogs.createLogEntry(titleValue, contentValue, tagValue).then(console.log('log successfully created'));	
			$('#add-title, #add-content, #add-tag').css('background-color', '#fafafa');
    		$('.successMsg').append(`Your log has been saved! You can <a href="/add-log">add another log</a> or <a href="/view-logs">return to your saved logs.`);
		});	 
	},
	setup: function() {
		AddLogs.bindSubmitBtn();
	}
}

$(AddLogs.setup);
