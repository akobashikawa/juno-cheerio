var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(filePath, options, callback) {
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
};