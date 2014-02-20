var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var login = require('./login')
var config = require('./config')
var log = require('./log')
var cheerio = require('cheerio')
var order = require('./pc_order')

var content = ''

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://sz.91160.com/guahao/ystep1/uid-103/schid-'+config.sch_id+'.html',
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
var detl_id = ''
var check = function(){
	options.headers['Cookie'] = cookie.getCookie()

	var req = http.request(options, function(res){

		var html = ''
		res.on('data', function(data){
			html += data
		})
		.on('end', function(){
			if(html.length < 1000){
				console.log('[' + new Date() + html.length)
				return
			}
			
			var $ = cheerio.load(html)
			$('input[name=detlid]').each(function(i,o){
				if($(o).parent().parent().hasClass('gray_1')){
					console.log('gray')
				}
				else{
					detl_id = $(o).attr('value')

					console.log('[' + new Date() + detl_id)

					order.submit({
						captcha: '8d11',
						pay_method: config.pay_method,
						schid: '',
						detlid: detl_id,
						member_id: config.member_id,
						doctor_id: '7996',
						phone: '18101571071',
						ny_sms_code: '',
						phone_check: ''
					})
				}
			})	
		})
	})

	req.write(content)
	req.end()
}

//check()
setInterval(check, 10)