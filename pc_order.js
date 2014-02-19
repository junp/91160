var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var config = require('./config')

var contentConf = querystring.stringify({
	captcha: 'ddfc',
	pay_method: config.pay_method,
	schid: config.sch_id,
	detlid: config.detl_id,
	member_id: config.member_id,
	doctor_id: config.doc_id,
	phone: '18101571071',
	ny_sms_code: '',
	phone_check: ''
})
console.log(contentConf)
var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://sz.91160.com/guahao/ysubmit.html',
	method: 'POST',
	headers: {
	"Content-Length": contentConf.length,
	"Cookie": cookie.getCookie(),
	"Content-Type": "application/x-www-form-urlencoded",
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	"Accept-Encoding":"gzip,deflate,sdch",
	"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
	"Cache-Control":"max-age=0",
	"Proxy-Connection":"keep-alive",
	"Host":"sz.91160.com",
	"Origin":"http://sz.91160.com",
	"Referer":"http://sz.91160.com/guahao/ystep3.html",
	"User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36"
	}
}

var order = function(content){
	if(content){
		contentConf = querystring.stringify(content)
			console.log(contentConf)
		options.headers['Content-Length'] = contentConf.length
	}

	options.headers['Cookie'] = cookie.getCookie()

	var req = http.request(options, function(res){
		res.setEncoding('utf8')

		res.on('data', function(data){
			console.log(data)
				//err(data)
		})
	})

	req.write(contentConf)
	req.end()
}
//order()
exports.submit = order
