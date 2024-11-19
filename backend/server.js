const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

const allowedOrigins = ['https://sonar-rock-or-mine-predictor-frontend.vercel.app'];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from allowed origins or no origin (e.g., Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Enable cookies/auth headers
  })
);

app.post('/predict', (req, res) => {
    console.log("Hello");
    const features = req.body.features;

    // Spawn a Python process and send features to your model script
    const pythonProcess = spawn('.venv/Scripts/python', ['predict.py', JSON.stringify(features)]);

    pythonProcess.stdout.on('data', (data) => {
        // Send prediction result back to the frontend
        res.json({ prediction: data.toString() });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).json({ error: 'Failed to get prediction' });
    });
});
app.get('/',(req,res)=>{
    res.send("Hello server");
})
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
