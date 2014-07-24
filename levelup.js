var level = require('level')

// get data store location
var storeloc = process.argv[2];

var db = level(storeloc);

db.get('levelmeup', function (err, value) {
	console.log(value);
})