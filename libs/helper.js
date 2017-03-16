'use strict'

const fs = require('fs');
const pathJs = require('path');

module.exports.each = function(items, callback)
{
    for(var key in items)
        callback(items[key], key);
}

module.exports.map = function(items, callback)
{
    var results = [ ];

    for(var key in items)
        results.push(callback(items[key], key));

    return results;
}

module.exports.unwindArray = function(items)
{
    var results = [ ];

    items.forEach(item => Array.isArray(item) ? results = results.concat(this.unwindArray(item)) : results.push(item));

    return results;
}

module.exports.listFiles = function(path, recursive, filter)
{
    var results = [ ];
    var fullPath = pathJs.resolve(path);
    var stats = fs.existsSync(fullPath) && fs.statSync(fullPath);

    if(stats && stats.isFile())
    {
        results.push(fullPath);
    }
    else if(stats && stats.isDirectory())
    {
        if(recursive)
        {
            fs.readdirSync(fullPath)
                .map(item => pathJs.join(fullPath, item))
                .map(item => this.listFiles(item, recursive, filter)
                .forEach(item => results.push(item)));
        }
        else
        {
            results = fs.readdirSync(fullPath).map(item => pathJs.join(fullPath, item));
        }
    }

    return (filter && results.filter(item => filter.test(item))) || results;
}
