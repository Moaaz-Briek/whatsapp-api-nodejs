const http = require("http");


const callWebhookInstance = async (sessionId, status = true) => {
    
    try {
        await updateClient(
            {
                msghop_token: process.env.MSGHOP_TOKEN,
                event: "instance.auth",
                sessionId: sessionId,
                status: status,
                timestamp: Date.now()
            }
        );
    } catch (err)
    {
        console.log(err);
    }
    
}

const updateClient = async (postData) => {

    var post_data = JSON.stringify(postData);    
    var post_options = {
        hostname: '127.0.0.1:8000',
        path: '/webhook/v1',
        method: 'POST',
        headers: {
            'X-Header-Name': process.env.MSGHOP_TOKEN,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response BAZZZZZZZZZZZZ: ' + chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

export {
    callWebhookInstance, 
};