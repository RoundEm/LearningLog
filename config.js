function getDbUrl() {
	let url = '';
	if (process.env.NODE_ENV === 'production') {
		url = process.env.DATABASE_URL || 'mongodb://Jason:Go0seMav86@ds249249.mlab.com:49249/learning-log';
	} else if (process.env.NODE_ENV === 'test') {
		url = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-learning-log';
	} 
	return url || 'mongodb://localhost/learning-log';
}

exports.PORT = process.env.PORT || 8080;

exports.DB_URL = getDbUrl();