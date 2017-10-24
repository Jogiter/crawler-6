const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema({
	sid: String,
	id: String,
	title: String,
	url: String,
	time: String,
})

export default schema
