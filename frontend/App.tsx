import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './styles';


export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      setIsModalVisible(true); // פתיחת ה-popup
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

      {/* כפתור עגול */}
      {!imageUri && (
        <TouchableOpacity style={styles.roundButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Flower for Recognition</Text>
        </TouchableOpacity>
      )}

      {/* לאחר העלאת תמונה */}
      {imageUri && (
        <>
          <TouchableOpacity style={styles.rectButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Change Image for Recognition</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Identify the Flower" onPress={uploadImage} />
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      {/* Popup Modal */}
      {isModalVisible && (
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.predictionText}>Prediction: {prediction}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}