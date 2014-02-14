var request = require('request')

request = request.defaults({
//	proxy:'http://proxy.tencent.com:8080'
})

var i = 0
var check = function(){
	request.get('http://sz.91160.com/doc/getschmast/unit_id-103/dep_id-2534/doc_id-7996/date-2014-02-14.html', function(a,b,c){
		var data = JSON.parse(c);
		var state = (data.sch.am['2014-02-21']['y_state'])

		console.log(state)
		console.log(i++)
		if(state != 1){
			//check()
		}
	})
}

setInterval(check,1)