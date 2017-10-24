import read from './read.js'
import save from './save2db.js'
import conn from './db.js'
const async = require('async')
const url = 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html'
let classList = []
let articleList = []
let articleListMap = {}

// 存储文章分类列表
function getClassList(done) {
	read.readClassList(url, (err, list) => {
		if (err) {
			return done(err)
		}
		classList = list
		save.classList(list, (err) => {
			if (err) {
				return done(err)
			}
			done(null, `[${new Date().toLocaleString()}] 更新文章分类id: ${list.id}`)
		})
	})
}

// 获取所有分类下的文章列表
function getArticleList(done) {
	async.eachSeries(classList, (item, next) => {
		read.readArticleList(item.url, (err, list) => {
			articleListMap[item.id] = list
			articleList = articleList.concat(list)
			// TODO: classList.count
			next(err)
		})
	}, done)
}

// 保存文章列表
function saveArticleList(done) {
	async.eachOfSeries((items, index, callback) => {
		items.map(item => item.sid = index)
		save.articleList(items, (err) => {
			if (err) {
				return callback(err)
			}
			callback(null, `[${new Date().toLocaleString()}] 更新文章id: ${items.id}`)
		})
	}, done)
}

// 存储文章详情
function saveArticleDetailList(done) {
	async.eachSeries(articleList, (item, next) => {
		read.readActicleDetail(item.url, (err, detail) => {
			detail.id = item.id
			save.articleDetailList(detail, (err) => {
				if (err) {
					return next(err)
				}
				next(null, `[${new Date().toLocaleString()}] 更新文章详情id ${detail.id}`)
			})
		})
	}, done)
}

// flow control
function saveAll() {
	async.series([
		getClassList,
		getArticleList,
		saveArticleList,
		saveArticleDetailList,
	], (err, results) => {
		if (err) {
			console.log(err)
		}
		// console.log(results)
		console.log(`====保存数据成功====${new Date().toLocaleString()}`)
	})
}

export default saveAll
