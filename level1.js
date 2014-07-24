
var leveldb = require('level');

// get data store location
var storeloc = process.argv[2];

// create db instance with data store location
var level = leveldb(storeloc);

var resArr = [];

var outputVals = function(element, index, array){
		console.log('key'+index + '=' + element);
	},
	storeVals = function(err, value){

		if (err) {
		    if (err.notFound) {
		      // handle a 'NotFoundError' here
		      return
		    }
		    // I/O or other error, pass it up the callback chain
		    return callback(err)
	  	}

	  	console.log(value);

	}

for (var i = 0; i <= 100; i++) {
	resArr[i] = level.get('key'+i,storeVals);
};

// resArr.forEach(outputVals);
