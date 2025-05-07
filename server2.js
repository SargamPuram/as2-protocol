import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());

// Endpoint to receive data and send an ACK response
app.post('/receive', (req, res) => {
  console.log('Received data:', req.body);
  // Send acknowledgment
  res.json({ status: 'ACK', message: 'Data received successfully' });
});

// Function to simulate Server 2 requesting data from Server 1
async function requestDataFromServer1() {
  try {
    const response = await axios.get('http://localhost:8448/send');
    const data = response.data;
    console.log('Data received from Server 1:', data);

    // Send the data to Server 2's /receive endpoint
    await axios.post('http://localhost:8449/receive', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Route to trigger data request from Server 1
app.get('/start', (req, res) => {
  requestDataFromServer1();
  res.send('Data request initiated from Server 2');
});

// Start Server 2 on port 8449
app.listen(8449, () => {
  console.log('Server 2 is running on http://localhost:8449');
});
