// import options from './config.js'
let mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
const db = mongoose.connection


db.on('error', err => {
	console.log(`Mongoose connection err ${err}`)
})

db.on('connected', () => {
	console.log(`Mongoose default connection open to ${uri}`)
})

db.on('disconnected', () => {
	console.log('Mongoose default connection disconected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  	db.close(function () {
    	console.log('Mongoose default connection disconnected through app termination');
    	process.exit(0);
  	});
});

let uri = 'mongodb://admin:password@192.168.33.169:27017/blogs'
let connection = mongoose.connect(uri)

export { mongoose }
