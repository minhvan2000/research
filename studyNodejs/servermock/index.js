const express = require('express');

const app = express();

// Middleware to parse XML
app.use(express.text({ type: 'text/xml', limit: '10mb' }));

// Example route to handle XML data
app.post('/test', (req, res) => {
    console.log(req.body);
    console.log('Parsed XML Data:', req.body);
    res.send('XML data received and parsed successfully!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
