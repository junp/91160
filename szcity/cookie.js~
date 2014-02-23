var fs = require('fs')

var normalCookie = function(cookies){
	var result = ''
	
	cookies.forEach(function(cookie){
		result += cookie.replace(/path=\//g, '')
	})

	return result
}

var setCookie = function(cookies){
	cookies = normalCookie(cookies)

	fs.writeFile('cookie.txt', cookies, function(data){
		console.log('setCookie ok')
	})
}

var getCookie = function(){
	var cookie = fs.readFileSync('cookie.txt', 'utf8')
	return cookie
}

exports.setCookie = setCookie
exports.getCookie = getCookie
