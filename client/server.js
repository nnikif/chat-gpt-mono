const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static('./dist/gpt-angular'));

// Handle all GET requests by sending back the index file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/gpt-angular/index.html'));
});

// Set the port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
