import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable, Image, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { storage } from '../config/firebaseConfig';
import ImageViewing from 'react-native-image-viewing';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const backendUrl = 'http://192.168.1.38:3000';
const socket = io(backendUrl);

export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false); 
  const [currentImage, setCurrentImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);  
  const route = useRoute();
  

  const [messages, setMessages] = useState([]); 


  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const onContentSizeChange = (contentWidth, contentHeight) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    
    setOffsetY(contentOffsetY);

    if (contentHeight - contentOffsetY - visibleHeight < 1) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });

    socket.on('receiveMessage', newMessage => {
      console.log('New message:', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    console.log('Before sending message: ', { message, photoUri });
  
    const { senderId, receiverId } = route.params;
    const messageData = { senderId, receiverId, message, image: photoUri ? photoUri : null };

    console.log('Sending message data:', messageData);

    socket.emit('sendMessage', messageData);

    try {
      await axios.post(`${backendUrl}/send-message`, messageData);
      console.log('Message sent to backend');
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
    setPhotoUri(null); 
    await fetchMessages();
  };

  const fetchMessages = async () => {
    try {
      const { senderId, receiverId } = route.params;
      const response = await axios.get(`${backendUrl}/messages`, {
        params: { senderId, receiverId },
      });
      setMessages(response.data); 
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isAtBottom]);

  const formatTime = time => {
    if (!time) return '';
    if (time && time.seconds !== undefined) {
      const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return date.toLocaleString('en-US', options);
    }
    return '';
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {route?.params?.name}
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => Alert.alert('Feature Coming Soon')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="videocam-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const uploadImageToFirebase = async (uri) => {
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const fileName = uri.split('/').pop();
    const storageRef = ref(storage, `chat_images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: You can monitor upload progress here
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setLoading(false);
          resolve(downloadURL);
        }
      );
    });
  };

  const openCamera = async () => {
    if (hasPermission === false) {
      alert("No access to camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    closeModal();

    if (!result.canceled && result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri); 

      try {
        const imageUrl = await uploadImageToFirebase(uri); 
        console.log('Image uploaded to Firebase. URL:', imageUrl);
        setPhotoUri(imageUrl); 
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    closeModal();
    if (!result.canceled && result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri); 

      try {
        const imageUrl = await uploadImageToFirebase(uri); 
        console.log('Image uploaded to Firebase. URL:', imageUrl);
        setPhotoUri(imageUrl); 
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }
  };

  const openImageViewer = (imageUri) => {
    setCurrentImage(imageUri);
    setVisible(true);
  };

  const closeImageViewer = () => setVisible(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={onContentSizeChange} 
      >
        {messages?.map((item, index) => (
          <Pressable
            key={index}
            style={[
              item?.senderId === route?.params?.senderId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: '#662d91',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: '#452c63',
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: '60%',
                  },
            ]}>
            {item?.image && (
              <TouchableOpacity onPress={() => openImageViewer(item?.image)}>
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 5 }}
                />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 15, textAlign: 'left', color: 'white', fontWeight: '500' }}>
              {item?.message}
            </Text>
            <Text style={{ fontSize: 9, textAlign: 'right', color: '#F0F0F0', marginTop: 5 }}>
              {formatTime(item?.timestamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <ImageViewing
        images={[{ uri: currentImage }]} 
        visible={visible}
        onRequestClose={closeImageViewer}
        imageIndex={0}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#dddddd', marginBottom: 5 }}>
        <Entypo style={{ marginRight: 7 }} name="emoji-happy" size={24} color="gray" />
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />

        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 50, height: 50, borderRadius: 10, marginHorizontal: 10 }}
          />
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 8 }}>
          <TouchableOpacity onPress={openModal}>
            <Entypo name="camera" size={24} color="gray" />
          </TouchableOpacity>

          <Feather name="mic" size={24} color="gray" />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (message.trim() || photoUri) {
              sendMessage();
            }
          }}
          style={{
            backgroundColor: message.trim() || photoUri ? '#662d91' : '#cccccc',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          disabled={!message.trim() && !photoUri}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

<Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: '100%', padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontSize: 18, fontFamily:'outfit-bold' }}>Select an Option</Text>
            <TouchableOpacity onPress={openCamera} style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: 'black' ,fontFamily:'outfit-medium'}}>Capture Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: 'black',fontFamily:'outfit-medium' }}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={{ marginTop: 20,marginBottom:10 }}>
              <Text style={{ fontSize: 16, color: 'gray',fontFamily:'outfit' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
