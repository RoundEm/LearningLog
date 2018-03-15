'use strict';

const AddLogs = {
	collectData: function() {
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
			// something to grab attachment or save for later feature?
		});
	},
	setup: function() {
		AddLogs.collectData();
	}
}

$(AddLogs.setup);