import json
import numpy as np
from joblib import load
import sys

try:
    # Load the model
    model = load("sonar_model.joblib")

    # Parse input data
    features = json.loads(sys.argv[1])
    features = np.array(features).reshape(1, -1)

    # Predict
    prediction = model.predict(features)
    result = {"prediction": prediction[0]}
    print(json.dumps(result))
    sys.stdout.flush()

except Exception as e:
    # Output the error as JSON for debugging
    error_message = {"error": str(e)}
    print(json.dumps(error_message))
    sys.stdout.flush()
    sys.exit(1)
