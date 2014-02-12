var request = require('request')

request = request.defaults({
	proxy:'http://proxy.tencent.com:8080'
})

request.get({url: 'http://sz.91160.com/doc/getschmast/unit_id-103/dep_id-2534/doc_id-17741/date-.html'}, function(a,b,c){
console.log(JSON.parse(c));
})
