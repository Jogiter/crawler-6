const request = require('request')
const cheerio = require('cheerio')
const async = require('async')
const debug = require('debug')('blog:update')

const url = 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html'

/**
 * 获取文章分类
 *
 * @param {String} url
 * @param {Function} callback
 */
function readClassList(url, callback) {
	request(url, (err, res) => {
		if (err) {
			return callback(err)
		}
		let $ = cheerio.load(res.body.toString())
		let classList = []
		$('.blog_classList li a').each(function() {
			let $el = $(this)
			let item = {
				name: $el.text().trim(),
				url: $el.attr('href')
			}
			let ids = item.url.match(/articlelist_(\d+)_(\d+)_\d\.html/)
			if (Array.isArray(ids)) {
				item.id = ids[2]
				classList.push(item)
			}
		})
		callback(null, classList)
	})
}

/**
 * 获取分类页面博文列表
 *
 * @param {String} url
 * @param {Function}callback
 */
function readArticleList(url, callback) {
	debug('读取博文列表 %s', url)

	request(url, (err, res) => {
		if (err) {
			return callback(err)
		}
		let $ = cheerio.load(res.body.toString())
		let classList = []
		$('.articleList .articleCell').each(function() {
			let $el = $(this)
			let item = {
				title: $el.find('.atc_title a').text().trim(),
				url: $el.find('.atc_title a').attr('href'),
				time: $el.find('.atc_tm').text().trim(),
			}
			let ids = item.url.match(/blog_(\w+).html/)
			if (Array.isArray(ids)) {
				item.id = ids[1]
				classList.push(item)
			}
		})
		let nextUrl = $('.SG_pgnext').attr('href')
		if (nextUrl) {
			readArticleList(nextUrl, (err, res) => {
				if (err) {
					return callback(err)
				}
				callback(null, classList.concat(res))
			})
		} else {
			callback(null, classList)
		}
	})
}


/**
 * 获取博文页面内容
 *
 * @param {String} url
 * @param {Function} callback
 */
function readActicleDetail(url, callback) {
	debug('读取博文内容 %s', url)

	request(url, (err, res) => {
		if (err) {
			return callback(err)
		}
		let $ = cheerio.load(res.body.toString())
		let tags = []
		$('#articlebody .blog_tag h3').each(function() {
			let tag = $(this).find('a').text().trim()
			if (tag) {
				tags.push(tag)
			}
		})
		let content = $('.articalContent').html();
		callback(null, {
			tags,
			content
		})
	})
}

export default {
	readClassList,
	readArticleList,
	readActicleDetail,
}
