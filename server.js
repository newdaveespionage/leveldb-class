var level = require('level');
var Engine = require('engine.io-stream');

var http = require('http');
var fs = require('fs');

var split = require('split');
var parse = require('through-parse');
var livestream = require('level-live-stream');

var db = level('./db', {
    valueEncoding: 'json'
});
livestream.install(db);

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
        }) + '/n');
    })

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
                    } else {
                        resp = {
                            error: null
                        };
                    }
                    db.get(data.key, function(err, value) {
                        if (err) {
                            resp.err = 'problem';
                        } else {
                            stream.write(JSON.stringify(resp) + '\n');
                        }
                    });
                })
            } else {}
            console.log(data)
        });
});

engine.attach(server, '/server');