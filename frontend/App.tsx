import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './styles';

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleImagePick = async (source: 'camera' | 'gallery') => {
    setIsPickerVisible(false); // Close Picker Popup
    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.150.165:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.flower);
      setIsModalVisible(true); // Show Prediction Popup
    } catch (error) {
      console.error('Error uploading image:', error);
      setPrediction('Error occurred while predicting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome to Flowerfy!</Text>

      {/* Upload Button */}
      {!imageUri && (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => setIsPickerVisible(true)}
        >
          <Text style={styles.buttonText}>Upload Flower for Recognition</Text>
        </TouchableOpacity>
      )}

      {/* Image Preview */}
      {imageUri && (
        <>
          <TouchableOpacity
            style={styles.rectButton}
            onPress={() => setIsPickerVisible(true)}
          >
            <Text style={styles.buttonText}>Change Image for Recognition</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TouchableOpacity style={styles.actionButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Identify the Flower</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      {/* Prediction Modal */}
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeIconText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.predictionText}>Prediction: {prediction}</Text>
          </View>
        </Modal>
      )}

      {/* Image Picker Modal */}
      {isPickerVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPickerVisible}
          onRequestClose={() => setIsPickerVisible(false)}
        >
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContent}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setIsPickerVisible(false)}
              >
                <Text style={styles.closeIconText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.pickerHeader}>Select Image Source</Text>
              <View style={styles.pickerButtonsContainer}>
                  <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => handleImagePick('camera')}
                  >
                    <Image
                      source={require('./assets/icons8-camera-50.png')} // הוסף את נתיב התמונה המתאימה
                      style={styles.icon}
                    />
                    <Text style={styles.pickerButtonText}>Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => handleImagePick('gallery')}
                  >
                    <Image
                      source={require('./assets/icons8-gallery-64.png')} // הוסף את נתיב התמונה המתאימה
                      style={styles.icon}
                    />
                    <Text style={styles.pickerButtonText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
