const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use(cors({
  origin: 'https://sonar-rock-or-mine-predictor-frontend.vercel.app', // Your frontend's URL
  methods: ['GET', 'POST', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true
}));

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
