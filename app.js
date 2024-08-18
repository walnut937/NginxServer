const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if(cluster.isPrimary){
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
    const express = require('express');
    const bodyParser = require('body-parser');
    const PORT = process.env.PORT || 3000; 
    const path = require('path');
    const app = express();

    // Set up EJS as the view engine and point to the Views folder
    app.set('view engine', 'ejs');

    app.set('views', path.join(__dirname, 'src', 'Views'));

    // Middleware to parse URL-encoded data from the form
    app.use(bodyParser.urlencoded({ extended: true }));


    // Serve static files from the "public" directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Route to serve the HTML form
    app.get('/', (req, res) => {
        // res.json({ message: `resolve by ${process.pid}`})
        res.render('home', {processId: process.pid});
    }); 

    // Route to handle form submissions
    app.post('/submit', (req, res) => {
        const { name, email, message } = req.body;

        // Render the result view and pass the form data to it
        res.render('result', { name, email, message });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    console.log(`Worker ${process.pid} started`);
}