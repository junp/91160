var request = require('request')
var order = require('./order')
var loginStatus = require('./check')

request = request.defaults({
//	proxy:'http://proxy.tencent.com:8080'
})

var i = 0
var check = function(){
	request.get('http://sz.91160.com/doc/getschmast/unit_id-103/dep_id-2534/doc_id-7996/date-.html', function(err,b,c){
		if(err){
			return
		}
		var data = JSON.parse(c);
		var state = (data.sch.pm['2014-02-24']['y_state']) + ''

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