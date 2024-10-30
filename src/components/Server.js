const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*",  // Allows all origins; replace with specific origin(s) if needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
  }));
const port = 5000;

app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Imran000',
  database: 'PSPDF'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Endpoint to get annotations
app.get('/annotations', (req, res) => {
  const query = 'SELECT index_id, Annotations FROM Annotations'; // Adjust column names if needed

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving annotations:', err);
      return res.status(500).send('Error retrieving annotations');
    }
    res.status(200).json(results);
  });
});


// Endpoint to save annotations
app.post('/save', (req, res) => {
  const annotations = req.body.annotations; // Assuming your request contains an 'annotations' field

  // Prepare the SQL statement
  const query = `
    INSERT INTO Annotations (index_id, Annotations) VALUES (?, ?)`;

  const values = annotations.map(annotation => [
    annotation.id,
    JSON.stringify(annotation) // Store the full annotation object as JSON
  ]);

  // Use a batch insert for all annotations
  db.query(query, [].concat(...values), (err, result) => {
    if (err) {
      console.error('Error saving annotations:', err);
      return res.status(500).send('Error saving annotations');
    }
    res.status(200).send('Annotations saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
