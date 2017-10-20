import {
	readClassList,
	readArticleList,
	readActicleDetail
} from '../app/article_all.js'
import { classList } from './save2db.js'
import conn from '../db/db.js'
const async = require('async')
const url = 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html'

// 存储文章分类列表
function getClassList() {
	readClassList(url, (err, list) => {
		if (err) {
			return console.log(err)
		}
		classList(list, (err) => {
			if (err) {
				return console.log(`Err=> ${JSON.stringify(err)}`)
			}
			console.log(`[${new Date().toLocaleString()}] 更新文章分类列表`)
		})
	})
}

// 存储文章列表




// 存储文章详情

getClassList()
