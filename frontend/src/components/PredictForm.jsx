import React from 'react';

const PredictForm = ({ inputData, setInputData, onPredict, inputMode }) => {

    return (
        <div className="w-full max-w-5xl p-5 bg-gray-900 rounded-lg shadow-lg mb-5 hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-teal-500">
            <h2 className="text-2xl font-semibold text-teal-500 text-center mb-4">Sonar Data Prediction</h2>
            <div className="grid grid-cols-12 gap-3">
                {inputData.map((value, index) => (
                    <div key={index} className="flex flex-col col-span-1">
                        <label className="text-xs font-medium text-teal-300 mb-1">
                            Attr {index + 1}
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={value}
                            onChange={(e) => {
                                const updatedData = [...inputData];
                                updatedData[index] = e.target.value;
                                setInputData(updatedData);
                            }}
                            className="p-2 rounded-md bg-gray-800 text-teal-200 border border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ease-in-out"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={onPredict}
                    className="px-5 py-2 rounded-lg font-semibold text-sm text-gray-900 bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                    Predict
                </button>
            </div>
        </div>
    );
};

export default PredictForm;
