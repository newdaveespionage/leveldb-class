var level = require('level');
var Engine = require('engine.io-stream');
var split = require('split');
var parse = require('through-parse');
var liveStream = require('level-live-stream');

var http = require('http');
var fs = require('fs');

var db = level('./db', {
    valueEncoding: 'json'
});
var livestream = liveStream(db);

var server = http.createServer(function(req, res) {

    if (req.url == '/bundle.js') {
        fs.createReadStream('./bundle.js').pipe(res);
    } else if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    }
});

server.listen(8000);

var engine = Engine(function(stream) {

    db.get('input', function(err, value) {
        stream.write(JSON.stringify({
            value: value
        }) + '\n');
    });

    livestream.on('data', function(change) {
        stream.write(JSON.stringify(change) + '\n');
    });

    stream
        .pipe(split())
        .pipe(parse())
        .on('data', function(data) {
            if (data.value) {
                db.put(data.key, data.value, function(err) {
                    var resp;
                    if (err) {
                        resp = {
                            error: 'there was an error'
                        };
                        stream.write(JSON.stringify(resp) + '\n');
                    }
                })
            } else {
                db.get(data.key, function(err, value) {
                    stream.write(JSON.stringify({
                        value: value
                    }) + '\n');
                })
            }
        });

})

engine.attach(server, '/server');