const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema({
	title: String,
	url: String,
	time: String,
})

export default schema
