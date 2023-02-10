var request = require('request');
var HTMLParser = require('node-html-parser');


async function getHtml(url) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': url
        };
        request(options, function (error, response) {
            if (error) reject(error);
            else {
                resolve(response.body)
            }
        });
    });
}


exports.getEntries = async function (url, pageNumber) {
    var html = await getHtml(url + "?p=" + pageNumber);
    var root = HTMLParser.parse(html);
    var entries = root.querySelectorAll('#entry-item');

    let list = []
    for (var i = 0; i < entries.length; i++) {
        let content = entries[i].querySelector(".content").toString();
        content = content.replace(/<[^>]*>?/gm, '');
        content = content.trim();
        //console.log(content);
        //console.log("-----------")
        if (content.length < 500) list.push(content);
    }
    return list;
}