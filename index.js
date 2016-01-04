var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

module.exports = function(filePath, options, callback) {
    if (options.url) {
        request(options.url, function(err, response, content) {
            if (err) return callback(new Error(err));
            if (!err && response.statusCode == 200) {
                var html = content.toString();
                $ = cheerio.load(html);
                if (typeof options.replaces === 'function') {
                    options.replaces($);
                }
                var rendered = $.html();
                return callback(null, rendered);
            }
        });
    } else {
        fs.readFile(filePath, function(err, content) {
            if (err) return callback(new Error(err));
            var html = content.toString();
            $ = cheerio.load(html);
            if (typeof options.replaces === 'function') {
                options.replaces($);
            }
            var rendered = $.html();
            return callback(null, rendered);
        });
    }
};