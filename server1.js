import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Sample JSON data to send
const sampleData = {
  message: 'Sample JSON data from Server 1',
  data: [1, 2, 3, 4],
};

app.use(bodyParser.json()); // To parse JSON data

// Route to send data
app.get('/send', (req, res) => {
  res.json(sampleData);
});

// Start Server 1 on port 8448
app.listen(8448, () => {
  console.log('Server 1 is running on http://localhost:8448');
});
