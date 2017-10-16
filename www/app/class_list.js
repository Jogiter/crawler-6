const request = require('request')
const cheerio = require('cheerio')
const debug = require('debug')('blog:update')

debug('读取博文类别列表')

request('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', (err, res) => {
	if (err) {
		throw new Error(err)
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
	console.log(classList)
})
