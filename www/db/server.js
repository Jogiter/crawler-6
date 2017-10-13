import request from 'request'

const url = 'http://cnodejs.org'

// args: error, response, body
function handleRequest(args) {
	if (args[0]) {
		console.log(args[0])
	}
	if (args[1].statusCode == 200) {
		console.log(`res=>${args[2]}`)
	} else {
		console.log('error')
	}
}

request({
	url,
	methods: 'GET',
	headers: {
		'Accept-Language': 'zh-CN,zh,q=0.8'
	}
}, (...args) => {
	handleRequest(args)
})
