const url = require('url');
const https = require('https');

exports.sampleRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var repository = 'avrillianz';
    if (reqUrl.query.repo) {
        repository = reqUrl.query.repo
    }

    var response = {
        "text": "Hello " + repository
    };

    var options = {
        host: "api.github.com",
        path: "/repos/avrillianz/Intention",
        headers: {
            "Accept": "application/vnd.github.v3+json",
            'User-Agent': 'Localhost'
        }
    }

    https.get(options, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};