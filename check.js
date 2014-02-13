var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var config = require('./config')

var content = ''

var options = {
	host: 'weixin.91160.com',
	path: '/index.php?c=account&a=index',
	method: 'GET',
	headers: {
	"Content-Length": content.length,
	"Cookie": cookie.getCookie(),
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":"gzip, deflate",
	"Accept-Language":"en-US,en;q=0.5",
	"Connection":"keep-alive",
	"Host":"weixin.91160.com",
	//"Referer":"http://weixin.91160.com/index.php?c=user&a=login",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
	}
}

var check = function(){


	var req = http.request(options, function(res){
		res.setEncoding('utf8')
		res.on('data', function(data){
			console.log(data)
		})
	})

	req.write(content)
	req.end()
}

 check()
