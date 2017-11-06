import mongoose from 'mongoose'
import classlistSchema from './classlist.scm.js'
import articlelistSchema from './articlelist.scm.js'
import articledetailSchema from './articledetail.scm.js'
const async = require('async')

let classListModel = mongoose.model('classlist', classlistSchema)
let articleListModel = mongoose.model('articlelist', articlelistSchema)
let articleDetailListModel = mongoose.model('articledetail', articledetailSchema)

/**
 * 保存或者更新数据
 * @param  {String}   model mongoose模型
 * @param  {Array}    list  数据列表
 * @param  {Function} next  [迭代器回调]
 */
function saveOrInsert(model, list, next) {
	model.find({
		id: list.id
	}).then(doc => {
		if (doc.length) { // if exist, update
			model.update({
				id: list.id
			}, list).then(res => {
				next();
			}).catch(e => {
				next(e)
			})
		} else { // if not exist, insert
			model.create(list).then(res => {
				next();
			}).catch(e => {
				next(e)
			})
		}
	}).catch(e => {
		next(e)
	})
}

/**
 * 获取文章分类列表
 * @param  {Array}   list      数据列表
 * @param  {Function} callback 回调函数
 */
function classList(list, callback = function() {}) {
	async.eachSeries(list, (item, next) => {
		saveOrInsert(classListModel, item, next)
	}, callback)
}

/**
 * 获取文章列表
 * @param  {Array}   list      数据列表
 * @param  {Function} callback 回调函数
 */
function articleList(list, callback = function() {}) {
	async.eachSeries(list, (item, next) => {
		saveOrInsert(articleListModel, item, next)
	}, callback)
}

/**
 * 获取文章详情
 * @param  {Object}   article  文章信息
 * @param  {Function} callback 回调函数
 */
function articleDetailList(article, callback = function() {}) {
	let model = articleDetailListModel
	model.find({
		id: article.id
	}).then(doc => {
		if (doc.length) { // if exist, update
			model.update({
				id: article.id
			}, article).then(res => {
				callback(res);
			}).catch(e => {
				callback(e)
			})
		} else { // if not exist, insert
			model.create(article).then(res => {
				callback();
			}).catch(e => {
				callback(e)
			})
		}
	}).catch(e => {
		callback(e)
	})
}

export default {
	classList,
	articleList,
	articleDetailList,
}
