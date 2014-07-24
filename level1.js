
var leveldb = require('level');

// get data store location
var storeloc = process.argv[2];

// create db instance with data store location
var level = leveldb(storeloc);

var resArr = [];

var outputVals = function(index, element){
		console.log('key'+index + '=' + element);
	};

var curridx = 0;

for (var i = 0; i <= 100; i++) !function(i){
	var curridx = i;
	resArr[i] = level.get('key'+i,function(err, value){

		if (err) {
		    if (err.notFound) {
		      // handle a 'NotFoundError' here
		      return
		    }
		    // I/O or other error, pass it up the callback chain
		    return callback(err)
	  	}

	  	outputVals(curridx,value)

	});
}(i);

// resArr.forEach(outputVals);
