const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema({
	id: String,
	name: String,
	url: String
})

export default schema
