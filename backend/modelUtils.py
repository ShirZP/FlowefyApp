import tensorflow as tf
import numpy as np
from PIL import Image

# טעינת המודל
MODEL_PATH = "model/model.tflite"
LABELS_PATH = "model/labels.txt"

# טוען את המודל
def load_model():
    interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
    interpreter.allocate_tensors()
    return interpreter

# עיבוד תמונה
def preprocess_image(image_path, input_size=(224, 224)):
    img = Image.open(image_path).convert('RGB')
    img = img.resize(input_size)
    img_array = np.expand_dims(np.array(img, dtype=np.float32) / 255.0, axis=0)  # Normalized and batched
    return img_array

# חיזוי תווית
def predict_label(image_array):
    interpreter = load_model()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # טוען את הקלט
    interpreter.set_tensor(input_details[0]['index'], image_array)
    interpreter.invoke()

    # מקבל את הפלט
    predictions = interpreter.get_tensor(output_details[0]['index'])
    predicted_class = np.argmax(predictions)
    confidence = predictions[0][predicted_class] #Identification percentage

    if confidence <= 0.7 :
        return 'Unknown'

    # טוען את התוויות
    with open(LABELS_PATH, 'r') as f:
        labels = f.read().splitlines()

    return labels[predicted_class]
