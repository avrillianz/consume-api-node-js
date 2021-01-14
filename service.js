const url = require('url');
const https = require('https');

exports.sampleRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var owner = 'avrillianz';
    var repository = 'Intention';

    if (reqUrl.query.owner) {
        owner = reqUrl.query.owner
    }

    if (reqUrl.query.repo) {
        repository = reqUrl.query.repo
    }

    var options = {
        host: "api.github.com",
        path: "/repos/" + owner + "/" + repository,
        headers: {
            "Accept": "application/vnd.github.v3+json",
            'User-Agent': 'Localhost'
        }
    }

    var request = https.get(options, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(JSON.stringify(data));

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};