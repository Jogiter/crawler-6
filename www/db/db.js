import options from './config.js'
import mongoose from 'mongoose'

const async = require('async')
const db = mongoose.connection

db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('connectted')
})

mongoose.connect('mongodb://localhost', options)

export default {}
