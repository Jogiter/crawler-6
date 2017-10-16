const request = require('request')
const cheerio = require('cheerio')
const debug = require('debug')('blog:update')

debug('读取博文内容')

let url = 'http://blog.sina.com.cn/s/blog_69e72a420102xufq.html'

request(url, (err, res) => {
	if (err) {
		return callback(err)
	}
	let $ = cheerio.load(res.body.toString())
	let tags = []
	$('#articlebody .blog_tag h3').each(function() {
		let tag = $(this).find('a').text().trim()
		if (tag) {
			tags.push()
		}
	})

	let content = $('.articalContent   newfont_family').html().trim();
	callback(null, {
		tags,
		content
	})
})


