import os
from flask import Flask, request, jsonify
from modelUtils import preprocess_image, predict_label
from flowersJSON import get_flower_info

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads' # Define the upload folder for saving uploaded images
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the folder if it doesn't already exist

@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image was uploaded in the request
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    # Delete any previous images in the upload folder to ensure it's clean
    for file in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, file)
        try:
            if os.path.isfile(file_path):  # Ensure it's a file before trying to delete
                os.unlink(file_path)  # Delete the file
        except Exception as e:
            return jsonify({"error": f"Error deleting old files: {str(e)}"}), 500

    # Save the new uploaded image in the upload folder
    image = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    # Process the image and run the prediction model
    try:
        processed_image = preprocess_image(image_path)  # Preprocess the image for the model
        prediction = predict_label(processed_image)  # Predict the label using the model

        # Handle cases where the model cannot identify the flower
        if prediction == 'Unknown':
            return jsonify({
                "flower": prediction,
                "info": "Oops! I couldn't identify this flower.\nTry again with another image:)"
            })
        
        prediction_info = get_flower_info(prediction) # Retrieve additional information about the predicted flower

        return jsonify({"flower": prediction, "info": prediction_info})  # Return the prediction and flower information as JSON
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Handle any errors during prediction or processing

# Run the Flask app, accessible on all network interfaces
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
