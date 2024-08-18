const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Set up EJS as the view engine and point to the Views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'Views'));

// Middleware to parse URL-encoded data from the form
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.render('home');
});

// Route to handle form submissions
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Render the result view and pass the form data to it
  res.render('result', { name, email, message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
