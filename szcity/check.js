var http = require('http')
var fs = require('fs')
var querystring = require('querystring')
var cookie = require('./cookie')
var config = require('./config')
var cheerio = require('cheerio')
var order = require('./order')

var content = querystring.stringify({
	date: config.todate,
	depid: config.depid,
	unitid: config.unitid
})

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://wap.szicity.com/cm/yiliao/wuxian/index.php?c=main&a=to_date',
	method: 'POST',
	headers: {
		"Accept":"text/html, */*; q=0.01",
		"Accept-Encoding":"deflate,sdch",
		"Accept-Language":"zh-CN,zh;q=0.8",
		"Connection":"keep-alive",
		"Content-Length":"36",
		"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
		"Cookie":"PHPSESSID=icmhpbcadhbk7ftrduk3v69730; ci_session=a%3A9%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2240c0feb4e8eec9c4ab01b5e154d5698a%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A12%3A%2210.245.76.21%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A50%3A%22Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_8_5%29+App%22%3Bs%3A13%3A%22last_activity%22%3Bs%3A10%3A%221392397320%22%3Bs%3A8%3A%22cap_word%22%3Bs%3A5%3A%2245124%22%3Bs%3A14%3A%22dynamic_mobile%22%3Bs%3A11%3A%2213434757283%22%3Bs%3A11%3A%22user_mobile%22%3Bs%3A13%3A%228613434757283%22%3Bs%3A7%3A%22user_id%22%3Bs%3A7%3A%221629157%22%3Bs%3A5%3A%22token%22%3Bs%3A32%3A%22eff2d2dc79d9289ed06f7f059c82aa67%22%3B%7D36da345fdaf26a054cf89456bf8bed04; szicity_proxy=40c0feb4e8eec9c4ab01b5e154d5698a",
		"Host":"wap.szicity.com",
		"Origin":"http://wap.szicity.com",
		"Referer":"http://wap.szicity.com/cm/yiliao/wuxian/index.php?c=main&a=doc&depid=693&unit_id=239",
		"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36",
		"X-Requested-With":"XMLHttpRequest"
	}
}

var idx = 0
var check = function(){
	options.headers['Cookie'] = cookie.getCookie()

	var req = http.request(options, function(res){
		idx++
		res.setEncoding('utf8')

		var html = ''
		res.on('data', function(data){
			html += data
		})
		.on('end', function(){
			var $ = cheerio.load(html)
			var length = 0;
			$('input[name=docid]').each(function(i,o){

					var time = $(o).attr('time')
					var value = $(o).attr('value').split('-')
					var docid = value[0]
					var detlid = value[1]

					if(config.docid == docid){
						var check = fs.readFileSync('code.txt', 'utf8')
						var params = {
								unitname:config.unitname,
								depname:config.depname,
								depid:config.depid,
								docname:config.docname,
								docid:docid,
								levelname:config.levelname,
								guahaoamt:config.guahaoamt,
								time:time,
								todate:config.todate,
								health_card:config.health_card,
								unitid:config.unitid,
								schid:config.schid,
								detlid:detlid,
								mid:config.mid,
								check:check,
								pay_method:config.pay_method
						}
						order.submit(params)
						console.log('可预约：', time, docid, detlid,new Date(),params)
					}
					
					/*
					unitname:深圳沙河医院
					depname:中医科
					depid:693
					docname:伍乘界
					docid:2137
					levelname:主治医师
					guahaoamt:15
					time:08:30-09:30
					todate:2014-02-25
					health_card:
					unitid:239
					schid:
					detlid:8202187
					mid:2367964
					check:gf
					pay_method:2
					*/

			})
			if(length===0){
				console.log('未到点:'+idx,new Date())
			}
		})
	})

	req.write(content)
	req.end()
}
//exports.check = check
setInterval(check, 100)
//check()
