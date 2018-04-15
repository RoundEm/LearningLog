function bindButton() {
	$('.newPage').keypress(function(event) {
		if (event.which === 13) {
			window.location.href = '/view-logs'
		}
	});
}

$(bindButton);