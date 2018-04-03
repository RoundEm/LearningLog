'use strict'
	
const viewLogId = window.location.pathname.split('/')[2];

function handleGetLog(err, log) {
	// console.log(err, log)
	if (err) {
		return console.log(err);
	} 
	$('.render-log-section').empty().append(renderLog(log));
}

function bindEditBtn() {
	$('#editLog').click(function() {
		let entryId = $(this).siblings('.render-log-section').find('.entryId').text();
		window.location.href = `/edit-log/${entryId}`;
	});
}

function initViewLog() {
	bindEditBtn();
	Data.getLog(viewLogId, handleGetLog);	
}

$(initViewLog);