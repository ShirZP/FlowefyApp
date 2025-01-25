import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './styles';

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [predictionInfo, setPredictionInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleImagePick = async (source: 'camera' | 'gallery') => {
    setIsPickerVisible(false);
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
      const response = await axios.post('http://192.168.5.80:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.flower); // flower name
      setPredictionInfo(response.data.info); // flower info
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      setPrediction('Error occurred while predicting');
      setPredictionInfo('');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ImageBackground
      source={require('./assets/background01.jpeg')} // הוסף תמונת רקע מתאימה לתיקיית assets
      style={styles.background}
      imageStyle={styles.backgroundImage} // עיצוב כהה לתמונה
      resizeMode = 'cover'
    >
      <View style={styles.container}>
        {/* Header */}
        {!imageUri && (
          <Text style={styles.header}>Welcome to Flowerfy!</Text>
        )}

        {/* Upload Button */}
        {!imageUri && (
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => setIsPickerVisible(true)}
          >
            <Text style={styles.buttonText}>Upload Flower{'\n'} for Recognition</Text>
          </TouchableOpacity>
        )}

        {/* Image Preview */}
        {imageUri && (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.iconButton} onPress={() => setIsPickerVisible(true)}>
                <Image source={require('./assets/icons8-upload-50.png')} style={styles.icon} />
                <Text style={styles.iconButtonText}>Change Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={uploadImage}>
                <Image source={require('./assets/icons8-search-50.png')} style={styles.icon} />
                <Text style={styles.iconButtonText}>Identify</Text>
              </TouchableOpacity>
            </View>
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
            <View style={styles.pickerOverlay}>
              <View style={styles.pickerContent}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.closeIconText}>X</Text>
                </TouchableOpacity>
                
                {/* Flower Name as Title */}
                <Text style={styles.predictionHeader}>{prediction}</Text>
                
                {/* Uploaded Image */}
                {imageUri && (
                  <Image source={{ uri: imageUri }} style={styles.modalImage} />
                )}
                {/* Flower Info */}
                <Text style={styles.predictionInfo}>{predictionInfo}</Text>
              </View>
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
                      source={require('./assets/icons8-camera-50.png')}
                      style={styles.iconPicker}
                    />
                    <Text style={styles.pickerButtonText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => handleImagePick('gallery')}
                  >
                    <Image
                      source={require('./assets/icons8-gallery-64.png')}
                      style={styles.iconPicker}
                    />
                    <Text style={styles.pickerButtonText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
}
