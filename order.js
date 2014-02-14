var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var config = require('./config')

var content = querystring.stringify({
	member_id: '2348354',
	pay_method: '2',
	unit_id: '103',
	sch_id: '2648690',
	detl_id: '10387687'
})

var options = {
	host: 'weixin.91160.com',
	path: '/index.php?c=order&a=submit',
	method: 'POST',
	headers: {
	"Content-Length": content.length,
	"Cookie": cookie.getCookie(),
	"Content-Type": "application/x-www-form-urlencoded",
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":"gzip, deflate",
	"Accept-Language":"en-US,en;q=0.5",
	"Connection":"keep-alive",
	"Host":"weixin.91160.com",
	"Referer":"http://weixin.91160.com/index.php?c=order&a=confirm&unit_id=103&sch_id=2648690&detl_id=10387687",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
	}
}

var order = function(){


	var req = http.request(options, function(res){
		res.setEncoding('utf8')
		var cookies = res.headers['set-cookie']

		res.on('data', function(data){
			console.log(data)
		})
	})

	req.write(content)
	req.end()
}

order()
