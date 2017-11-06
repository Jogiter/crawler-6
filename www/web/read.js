import mongoose from 'mongoose'
import classlistSchema from '../update/classlist.scm.js'
import articlelistSchema from '../update/articlelist.scm.js'
import articledetailSchema from '../update/articledetail.scm.js'

let classListModel = mongoose.model('classlist', classlistSchema)
let articleListModel = mongoose.model('articlelist', articlelistSchema)
let articleDetailListModel = mongoose.model('articledetail', articledetailSchema)

/**
 * 获取所有的文章列表
 * @param  {Function} callback 回调函数
 */
function getArticleList(callback) {
	articleListModel.find({}, (err, docs) => {
		if (err) {
			return callback(err)
		}
		callback(null, docs)
	})
}

/**
 * 根据文章id获取文章详情
 * @param  {String}   id       文章id
 * @param  {Function} callback 回调函数
 */
function getArticleDetail(id, callback) {
	articleDetailListModel.find({
		id
	}, (err, docs) => {
		if (err) {
			return callback(err)
		}
		callback(null, docs[0])
	})
}

export default {
	getArticleList,
	getArticleDetail
}
