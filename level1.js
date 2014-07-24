
var leveldb = require('level');

// get data store location
var storeloc = process.argv[2];

// create db instance with data store location
var level = level(storeloc);

var resArr = [];

var outputVals = function(element, index, array){
	console.log('key'+index + '=' + element);
}

for (var i = 0; i <= 100; i++) {
	resArr[i] = level.get('key'+i);
};

resArr.forEach(outputVals);
