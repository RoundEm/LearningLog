'use strict';

const AddLogs = {
	createLogEntry: function(title, content, tag) {
		console.log('createLogEntry ran');
		const params = {
			title: title,
			content: content,
			tag: tag
		}
		return $.post('/logEntries', params, function(data) {});
		
	},
	bindSubmit: function() {
		$('.add-log').submit(function(event) {
			event.preventDefault();
			let titleTarget = $(this).find('#add-title');
			let titleValue = titleTarget.val();
			let contentTarget = $(this).find('#add-content');
			let contentValue = contentTarget.val();
			let tagTarget = $(this).find('#add-tag');
			let tagValue = tagTarget.val();
			titleTarget.val('');
			contentTarget.val('');
			tagTarget.val('');

			AddLogs.createLogEntry(titleValue, contentValue, tagValue).then(console.log('success!'));

		});	 
	},
	setup: function() {
		AddLogs.bindSubmit();
	}
}

$(AddLogs.setup);
