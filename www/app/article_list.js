const request = require('request')
const cheerio = require('cheerio')
const debug = require('debug')('blog:update')

debug('读取博文列表')

let url = 'http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html'

function readArticleList(url, callback) {
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

readArticleList(url, (err, list) => {
	if (err) {
		console.log(err.stack)
	}
	console.log(list, list.length)
})
