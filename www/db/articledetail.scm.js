const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema({
	tags: {
		type: Array,
		default: []
	},
	content: String
})

export default schema
