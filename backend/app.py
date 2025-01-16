import os
from flask import Flask, request, jsonify
from utils import preprocess_image, predict_label

app = Flask(__name__)

# הגדרת נתיב להעלאת תמונה
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    # מחיקת תמונות קודמות בתיקיית uploads
    for file in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            return jsonify({"error": f"Error deleting old files: {str(e)}"}), 500

    # שמירת התמונה החדשה בתיקייה
    image = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    # עיבוד והרצת המודל
    try:
        processed_image = preprocess_image(image_path)
        prediction = predict_label(processed_image)
        return jsonify({"flower": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
