const mongoose = require('mongoose');

// Replace the database URL with your own
const dbUrl = 'mongodb://127.0.0.1:27017/webapplication';

mongoose.connect(dbUrl, {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export the database object for use in other parts of the application
module.exports = db;
