var http = require('http')
var querystring = require('querystring')
var cookie = require('./cookie')
var login = require('./login')
var config = require('./config')
var order = require('./order')
var log = require('./log')

var content = ''

var options = {
	host: config.proxy.host,
	port: config.proxy.port,
	path: 'http://weixin.91160.com/index.php?c=doc&a=detl&unit_id=103&detl=2672372|',
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
	"Origin":"http://weixin.91160.com",
	"X-Requested-With":"XMLHttpRequest",
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
		res.setEncoding('utf8')

		res.on('data', function(body){
			try
			{
				var data = JSON.parse(body).data
			}
			catch (e)
			{
				return
			}
			//var data = JSON.parse(body).data
			var max = 0
			var num = 0
			for(var d in data){
				max = data[d]['yuyue_max']
				num = data[d]['yuyue_num']
				if(max>num){
					console.log('可预约')
					order.submit({
						member_id: config.member_id,
						pay_method: config.pay_method,
						unit_id: config.unit_id,
						sch_id: data[d]['schedule_id'],
						detl_id: data[d]['detl_id']
					})
					log.write('['+new Date()+']ok.........')
					//log.err(2)
				}
				else{
					console.log('约满')
					log.write('['+new Date()+']约满.........')
				}
				console.log(data[d]['detl_id'])
				console.log(data[d]['schedule_id'])
			}
			
		})

	})

	req.write(content)
	req.end()
}
//check()
setInterval(check,500)
