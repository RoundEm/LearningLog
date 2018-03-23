exports.DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/learning-log';
exports.TEST_DB_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-learning-log';
exports.PORT = process.env.PORT || 8080;