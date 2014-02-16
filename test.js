var request = require('request')
var order = require('./order')
var loginStatus = require('./check')
var config = require('./config')

request = request.defaults({
//	proxy:'http://proxy.tencent.com:8080'
})

var i = 0
var cgi = 'http://sz.91160.com/doc/getschmast/unit_id-'+config.unit_id+'/dep_id-'+config.dep_id+'/doc_id-'+config.doc_id+'/date-.html'
var check = function(){
	request.get(cgi, function(err,b,c){
		if(err){
			return
		}
		var data = JSON.parse(c)
		var sch = config.sch
		var state = (data.sch[sch.t][sch.d]['y_state']) + ''

		var msg = ''
		switch (state){
			case '0':
				msg = '约满'
				break
			case '1':
				msg = '可预约'
				break
			case '-2':
				msg = '未到点'
				break
			defaults:
				msg = '异常'
		}
		console.log('['+new Date()+']' + msg + ' 第'+(i++)+'次尝试')
		if(state == 1){
			order.submit()
		}
	})
}

loginStatus.check()



setInterval(function(){
	loginStatus.check()
},10000)

setInterval(check,100)