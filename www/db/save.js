import {
	readClassList,
	readArticleList,
	readActicleDetail
} from '../app/article_all.js'
import classList from '../db/classlist.dao.js'
import conn from '../db/db.js'
const async = require('async')

// readArticleList(url, (err, articleList) => {
// 	if (err) {
// 		return console.log(err)
// 	}
// 	async.eachSeries(articleList, (article, next) => {
// 		readActicleDetail(article.url, (err, articleDetail) => {
// 			if (err) {
// 				console.log(err)
// 			}
// 			console.log(articleDetail)
// 			next()
// 		})
// 	}, err => {
// 		if (err) {
// 			return console.log(err)
// 		}
// 		console.log('完成')
// 	})
// })

// 存储分类列表
function classlist() {
	let url = 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html'
	readClassList(url, (err, list) => {
		if (err) {
			return console.log(err)
		}
		classList(list, (err) => {
			if (err) {
				return console.log(`Err=> ${JSON.stringify(err)}`)
			}
			console.log('更新分类功能')
		})
	})
}
