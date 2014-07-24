// client.js
var engine = require('engine.io-stream');
var split = require('split');
var parse = require('through-parse');
var domready = require('domready');

// attach to stream
var stream = engine('/server');

domready(function() {

    var input = document.querySelector('input');
    input.addEventListener('change', function(value) {
        stream.write(JSON.stringify({
            key: 'input',
            value: input.value
        }) + '\n');
    })

    stream
        .pipe(split())
        .pipe(parse())
        .on('data', function(data) {
            var h1 = document.querySelector('h1');
            h1.innerText = data.value;
        });

});