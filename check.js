var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var login = require('./login')

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
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
	}
}

var check = function(){
	options.headers['Cookie'] = cookie.getCookie()

	var req = http.request(options, function(res){
		if(res.statusCode == 302){
			console.log('[' + new Date() + ']登录失效，res.statusCode:' + res.statusCode)
			login.login()
			console.log('------------------')
			console.log('[' + new Date() + ']尝试重新登录...')
			console.log('------------------')
		}
		else if(res.statusCode == 200){
			console.log('[' + new Date() + ']登录正常')
		}

		res.on('data', function(data){})
	})

	req.write(content)
	req.end()
}
exports.check = check
