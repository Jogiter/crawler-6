const express = require('express')
const schedule = require('node-schedule')
require('./update/db.js');
import saveAll from './update/save.js'
import article from './web/read.js'
const path = require('path')

let app = express()
const port = 3000

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
	article.getArticleList((err, list) => {
		if (err) {
			console.log(err)
			return res.send('something wrong')
		}
		res.render('index', {
			articleList: list
		})
	})
})

app.get('/article/:id', (req, res, next) => {
	article.getArticleDetail(req.params.id, (err, article) => {
		if (err) {
			console.log(err)
			return res.send('something wrong')
		}
		res.render('article', {
			article
		})
	})
})

app.listen(port, () => {
	console.log(`You are listening on port ${port}`)
})

let job = schedule.scheduleJob('*/3 * * * *', () => {
	saveAll()
})
