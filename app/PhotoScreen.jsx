import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { getRegistrationProgress, saveRegistrationProgress } from '../config/registrationUtils';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { app } from '../config/firebaseConfig';

const storage = getStorage(app);

export default function PhotoScreen() {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const compressImage = async (uri) => {
    const manipulatedImage = await manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: SaveFormat.JPEG }
    );
    return manipulatedImage.uri;
  };

  const uploadImageToFirebase = async (uri) => {
    const compressedUri = await compressImage(uri);
    const response = await fetch(compressedUri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setIsUploading(true);
      const uri = result.assets[0].uri;
      const uploadUri = await uploadImageToFirebase(uri);
      const index = imageUrls.findIndex((url) => url === '');
      if (index !== -1) {
        const updatedUrls = [...imageUrls];
        updatedUrls[index] = uploadUri;
        setImageUrls(updatedUrls);
      }
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = '';
    setImageUrls(updatedUrls);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getRegistrationProgress('Photos').then((progressData) => {
      if (progressData && progressData.imageUrls) {
        setImageUrls(progressData.imageUrls || ['', '', '', '', '', '']);
      }
    });
  }, []);

  const handleNext = async () => {
    if (imageUrls.every((url) => url.trim() !== '')) {
      setIsUploading(true);
      await saveRegistrationProgress('Photos', { imageUrls });
      setIsUploading(false);
      navigation.navigate('PromptsScreen');
    } else {
      Alert.alert('Incomplete', 'Please upload all 6 images before proceeding.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="photo-camera-back" size={22} color="black" />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'outfit-Bold',
            marginTop: 15,
          }}
        >
          Pick your videos and photos
        </Text>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            {imageUrls.slice(0, 3).map((url, index) => (
              <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                <Pressable
                  style={{
                    borderColor: '#581845',
                    borderWidth: url ? 0 : 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    height: 100,
                    width: '100%',
                  }}
                >
                  {url ? (
                    <Image
                      source={{ uri: url }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : (
                    <EvilIcons name="image" size={22} color="#581845" />
                  )}
                </Pressable>
                {url && (
                  <Pressable
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: 15,
                      padding: 5,
                    }}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={15}
                      color="white"
                    />
                  </Pressable>
                )}
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
              marginTop: 20,
            }}
          >
            {imageUrls.slice(3, 6).map((url, index) => (
              <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                <Pressable
                  style={{
                    borderColor: '#581845',
                    borderWidth: url ? 0 : 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    height: 100,
                    width: '100%',
                  }}
                >
                  {url ? (
                    <Image
                      source={{ uri: url }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : (
                    <EvilIcons name="image" size={22} color="#581845" />
                  )}
                </Pressable>
                {url && (
                  <Pressable
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: 15,
                      padding: 5,
                    }}
                    onPress={() => handleRemoveImage(index + 3)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={15}
                      color="white"
                    />
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#581845',
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={handleAddImage}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#581845',
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={handleNext}
            disabled={isUploading}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Next
            </Text>
          </TouchableOpacity>
          {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </View>
    </ScrollView>
  );
}
