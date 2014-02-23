var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var config = require('./config')


var content = querystring.stringify({
})

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://wap.szicity.com/cm/yiliao/wuxian/index.php?c=main&a=saveyuyue',
	method: 'POST',
	headers: {
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding":"deflate,sdch",
		"Accept-Language":"zh-CN,zh;q=0.8",
		"Cache-Control":"max-age=0",
		"Connection":"keep-alive",
		"Content-Length":"342",
		"Content-Type":"application/x-www-form-urlencoded",
		"Cookie":"ci_session=a%3A9%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2240c0feb4e8eec9c4ab01b5e154d5698a%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A12%3A%2210.245.76.21%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A50%3A%22Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_8_5%29+App%22%3Bs%3A13%3A%22last_activity%22%3Bs%3A10%3A%221392397320%22%3Bs%3A14%3A%22dynamic_mobile%22%3Bs%3A11%3A%2213434757283%22%3Bs%3A11%3A%22user_mobile%22%3Bs%3A13%3A%228613434757283%22%3Bs%3A7%3A%22user_id%22%3Bs%3A7%3A%221629157%22%3Bs%3A5%3A%22token%22%3Bs%3A32%3A%22b32b7ee0469bfafc0d49529be33136cd%22%3Bs%3A8%3A%22cap_word%22%3Bs%3A5%3A%2279763%22%3B%7D0a5da3226609ea8efe59306b83e1931a; PHPSESSID=icmhpbcadhbk7ftrduk3v69730; szicity_proxy=40c0feb4e8eec9c4ab01b5e154d5698a",
		"Host":"wap.szicity.com",
		"Origin":"http://wap.szicity.com",
		"Referer":"http://wap.szicity.com/cm/yiliao/wuxian/index.php?c=main&a=confirm&unitid=239&depid=693&schid=&time=08:30-09:30&todate=2014-02-25&health_card=&docid=2137-8202187&mid=2348354&pay_method=2",
		"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36"
	}
}

var order = function(params){
	var content = querystring.stringify(params)
	options.headers['Content-Length'] = content.length
	options.headers['Cookie'] = cookie.getCookie()

	var req = http.request(options, function(res){
		res.setEncoding('utf8')
		var html = ''
		res.on('data', function(data){
			html+=data
		})
		.on('end', function(){
			console.log(html)
		})
	})

	req.write(content)
	req.end()
}
//order()
exports.submit = order
