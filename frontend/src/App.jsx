import React, { useState } from 'react';
import PredictForm from './components/PredictForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [inputMode, setInputMode] = useState("manual"); // "manual" or "predefined"
  const [inputData, setInputData] = useState(Array(60).fill(""));

  // Example of predefined values with a known result (replace these with actual data if available)
  const predefinedData = [
    0.0187,0.0346,0.0168,0.0177,0.0393,0.1630,0.2028,0.1694,0.2328,0.2684,0.3108,0.2933,0.2275,0.0994,0.1801,0.2200,0.2732,0.2862,0.2034,0.1740,0.4130,0.6879,0.8120,0.8453,0.8919,0.9300,0.9987,1.0000,0.8104,0.6199,0.6041,0.5547,0.4160,0.1472,0.0849,0.0608,0.0969,0.1411,0.1676,0.1200,0.1201,0.1036,0.1977,0.1339,0.0902,0.1085,0.1521,0.1363,0.0858,0.0290,0.0203,0.0116,0.0098,0.0199,0.0033,0.0101,0.0065,0.0115,0.0193,0.0157
  ];

  const handlePredict = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('https://sonar-rock-or-mine-predictor-backend.vercel.app/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "features": inputData }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const predictionText = result.prediction === "M\r\n" ? 'Mine' : 'Rock';

        // Show prediction as a toast
        toast.info(`Prediction Result: ${predictionText}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: '#324960',
            color: '#ffcc00',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(255, 204, 0, 0.5)',
          },
        });
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    }
  };

  // Handle input mode change
  const handleModeChange = (mode) => {
    setInputMode(mode);
    if (mode === "predefined") {
      setInputData(predefinedData); // Populate with predefined values
    } else {
      setInputData(Array(60).fill("")); // Clear values for manual entry
    }
  };

  const validateForm = () => {
    for (let i = 0; i < inputData.length; i++) {
      if (inputData[i] === "" || inputData[i] < 0) {
        if (inputData[i] === "") {
          toast.error(`Attribute ${i + 1} should not be empty`, {
            theme: "dark",
            style: { backgroundColor: "#1a202c", color: "#fbbf24" },
          });
        } else if (inputData[i] < 0) {
          toast.error(`Attribute ${i + 1} should not contain negative values`, {
            theme: "dark",
            style: { backgroundColor: "#1a202c", color: "#fbbf24" },
          });
        }
        return false;
      }
    }
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-800 to-black text-gray-300 font-sans">
      <header className="w-full py-7 bg-gray-900 text-teal-300 text-center shadow-lg border-b border-teal-500">
        <h1 className="text-3xl font-semibold tracking-wide leading-tight">
          Rock or Mine Prediction
        </h1>
      </header>

      <main className="flex-grow w-full flex flex-col items-center px-4 mt-8">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex items-center gap-6 mb-6">
          <label className="font-medium text-gray-300 text-base">Choose Input Mode:</label>
          <button
            onClick={() => handleModeChange("manual")}
            className={`px-5 py-2 rounded-lg text-lg transition-all duration-500 ${inputMode === "manual"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-700 text-gray-200"
              }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => handleModeChange("predefined")}
            className={`px-5 py-2 rounded-lg text-lg transition-all duration-500 ${inputMode === "predefined"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-700 text-gray-200"
              }`}
          >
            Use Predefined Data
          </button>
        </div>

        <PredictForm
          inputData={inputData}
          setInputData={setInputData}
          onPredict={handlePredict}
          inputMode={inputMode}
        />

        <ToastContainer />
      </main>
    </div>
  );
};

export default App;
