const net = require('net');

const port = 9000;

/* START PRIMARY HEADER */
const headerStatus = 'HTTP/1.1 status\r\n'; // code: [1xx, 2xx, 3xx, 4xx, 5xx]; type: [OK, FORBIDDEN, ERROR, NOTFOUND, ...]
const headerContentType = 'Content-Type: dataType; charset=utf-8\r\n'; // dataType: [text/plain, application/json, ...]
const headerContentLength = 'Content-Length: number\r\n';
const headerConnection = 'Connection: data\r\n'; // close or keep-alive
const headerServer = 'Server: express-js\r\n'; // information server
/* END PRIMARY HEADER */

/* START SUB HEADER */
// const headerContentSecurityPolicy = `Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests\r\n`;
// const headerCrossOriginOpenerPolicy =
//     'Cross-Origin-Opener-Policy: same-origin\r\n';
// const headerOriginAgentCluster = 'Origin-Agent-Cluster: ?1\r\n';
// const headerReferrerPolicy = 'Referrer-Policy: no-referrer\r\n';
// const headerStrictTransportSecurity =
//     'Strict-Transport-Security: max-age=15552000; includeSubDomains\r\n';
// const headerXContentTypeOptions = 'X-Content-Type-Options: nosniff\r\n';
// const headerXDNSPrefetchControl = 'X-DNS-Prefetch-Control: off\r\n';
// const headerXDownloadOptions = 'X-Download-Options: noopen\r\n';
// const headerXFrameOptions = 'X-Frame-Options: SAMEORIGIN\r\n';
// const headerXPermittedCrossDomainPolicies =
//     'X-Permitted-Cross-Domain-Policies: none\r\n';
// const headerXXSSProtection = 'X-XSS-Protection: 0\r\n';
// const headerAccessControlAllowOrigin = 'Access-Control-Allow-Origin: *\r\n';
// const headerETag = 'ETag: W/"325-csS55sudG+EMjTTBheNrq8UhlsE"\r\n';
// const headerDate = 'Date: Fri, 11 Oct 2024 04:45:58 GMT\r\n';
/* END SUB HEADER */

const dataBody =
    '{"message":"Login Successful","status":200,"metadata":{"user":{"_id":"66f28a2679cc7f33356e9c8f","fullName":"Super Administrator","email":"admin@gmail.com","companyId":{"_id":"66f28a2379cc7f33356e9c7f","name":"DFM-Engineering"},"phoneNumber":"03xxxxxxxxx","address":"Unknown","avatar":"office-man.png"},"tokenType":"Bearer","tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYyOGEyNjc5Y2M3ZjMzMzU2ZTljOGYiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyODYyMTk1OCwiZXhwIjoxNzI4NjY1OTk5fQ.bv4LbEbdodC2DnNvS_s7Mf2M2aXngRLD-DyMTqVH6N8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYyOGEyNjc5Y2M3ZjMzMzU2ZTljOGYiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyODYyMTk1OCwiZXhwIjoxNzI5MjI2NzU4fQ._fzWTk_GgnLBeR8vKYzXgU_lvYz6Rrci8QO7oJ2J2fI"}},"options":{}}';

const dataHTMl = `\r\n<!doctype html>
    <html lang="en">

    <head>
    <meta charset="utf-8">
    <title class="title-head">iFactory</title>
    <base href="/app/">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" class="icon-head" href="assets/img/Logo-01.png">
    
    <!-- Load environment variables -->
    <script src="env.js"></script>

    <link rel="stylesheet" href="/app/styles.0fa766982088ab587b8c.css"></head>

    <body id="body">
    <app-root></app-root>
    <!-- color CSS -->
    <link href="assets/css/colors/blue.css" id="theme" rel="stylesheet">
    <script src="/app/runtime-es2015.9acb748a591a92d013d8.js" type="module"></script><script src="/app/runtime-es5.9acb748a591a92d013d8.js" nomodule defer></script><script src="/app/polyfills-es5.7f811dda7d2d3f33989f.js" nomodule defer></script><script src="/app/polyfills-es2015.16046d31dec4042270da.js" type="module"></script><script src="/app/scripts.2b5e50588c678ee47ab8.js" defer></script><script src="/app/main-es2015.134df2969b760903955a.js" type="module"></script><script src="/app/main-es5.134df2969b760903955a.js" nomodule defer></script></body>

    </html>`;

const server = net.createServer();

const handelHeader = (
    status = { code: 200, type: 'OK' },
    contentType = 'text/plain',
    connection = 'keep-alive',
    server = 'express-js',
    data = ''
) => {
    const result =
        headerStatus.replace(/status/i, `${status.code} ${status.type}`) +
        headerContentType.replace(/dataType/i, contentType) +
        // headerContentLength.replace(/number/i, data.length) +
        headerConnection.replace(/data/i, connection) +
        headerServer.replace(/express-js/i, server) +
        `\r\n${data}`;

    return result;
};

server.on('connection', (stream) => {
    console.log('A new client connection');

    stream.on('data', (message) => {
        console.log('message::', message.toString('utf8'));
    });

    stream.write(
        handelHeader(
            { code: 200, type: 'OK' },
            'text/plain',
            'close',
            'express-js',
            dataBody
        ),
        (err) => {
            console.log(err);
        }
    );

    console.log(stream.readyState);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('Address in use, stopping...');
        setTimeout(() => {
            server.close();
        }, 1000);
    } else {
        console.error('err::', err.message);
        throw err;
    }
});

server.listen(port, (event) => {
    console.log(`Server is listening on %j`, server.address());
});
