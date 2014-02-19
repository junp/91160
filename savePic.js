var fs = require('fs')
var http = require('http')
var config = require('./config')
var cookie = require('./cookie')

var content = ''

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://sz.91160.com/images/code/h-36/w-80.html',
	method: 'GET',
	headers: {
	"Content-Length": content.length,
	"Cookie": cookie.getCookie(),
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	"Accept-Encoding":"gzip, deflate",
	"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
	"Connection":"keep-alive",
	"Host":"weixin.91160.com",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
	}
}

var savePic = function(){
	options.headers['Cookie'] = cookie.getCookie()
	var file = fs.createWriteStream('code.tif')
	var req = http.request(options, function(res){
		res.on('data', function(data){
			file.write(data)
		})
		.on('end', function(){
			file.end()
			console.log('download success')
		})
	})

	req.write(content)
	req.end()
}

savePic()