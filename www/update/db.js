// import options from './config.js'
let mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
const db = mongoose.connection


db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('db connectted')
})

let uri = 'mongodb://admin:password@192.168.33.169:27017/blogs'
let connection = mongoose.connect(uri)

export { mongoose }
