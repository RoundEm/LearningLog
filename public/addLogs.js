'use strict';

const AddLogs = {
	createLogEntry: function(title, content, tag) {
		console.log('createLogEntry ran');
		const params = {
			title: title,
			content: content,
			tag: tag
		}
		return $.ajax({
			url: '/logEntries', 
			dataType: 'json',
			method: 'post',
			data: params
		})
		.then(function(data) {
			console.log('params:', params);
			console.log('data:', data);
		});

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

			AddLogs.createLogEntry(titleValue, contentValue, tagValue);

			// window.location ='http://localhost:8080/view-logs';
			// window.location.href='http://localhost:8080/view-logs';
			// window.location.replace('http://localhost:8080/view-logs');
		});	 
	},
	setup: function() {
		AddLogs.bindSubmit();
	}
}

$(AddLogs.setup);
