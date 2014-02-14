var fs = require('fs')

function Log(file, config){
	// new Log(config)
	if(typeof file === 'object'){
		config = file
		file = config.file
	}

	// Log(file)
	else if(typeof file === 'string'){
		config = config || {} 
	}

	// new Log()
	else if(typeof file === 'undefined'){
		file = Log.defaults.file
		config = {}
	}

	
	var defaults = Log.defaults
	file = file || defaults.file
	config.flags = config.flags || defaults.flags
	config.encoding = config.encoding || defaults.encoding

	this.stream = fs.createWriteStream(file, config)
}

Log.prototype.write = function(msg){
	this.stream.write(msg + "\n")
	//this.stream.end()
}
Log.defaults = {
	file: 'log.txt',
	flags: 'a+',
	encoding: null
}

var log = new Log()
for(var i = 0; i < 1000; i++){
	console.log(i)
	log.write(i)
}