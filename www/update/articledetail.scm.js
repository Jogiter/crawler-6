const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema({
	id: String,
	tags: {
		type: Array,
		default: []
	},
	content: String
})

export default schema
