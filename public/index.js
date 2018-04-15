function bindButton() {
	$('.newPage').keypress(function() {
		window.location.href = '/view-logs'
	});
}

$(bindButton);