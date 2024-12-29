import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const backendUrl = 'https://teenmate-backend.onrender.com';
const socket = io(backendUrl);
export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null); 
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  

  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  // Connect to Socket.IO server
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
    const { senderId, receiverId } = route.params;
    const messageData = { senderId, receiverId, message,image: photoUri ? photoUri : null, };

    // Emit message via Socket.IO
    socket.emit('sendMessage', messageData);

    // Send message to Firestore through your backend
    try {
      await axios.post(`${backendUrl}/send-message`, messageData);
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
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true }); 
    }
  }, [messages]);

  const formatTime = time => {
    if (!time) return '';
   
    if (time && time.seconds !== undefined) {
      const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000); 
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return date.toLocaleString('en-US', options); 
    }
  
    return ''; 
  };
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {route?.params?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={()=>Alert.alert("Feature Coming Soon")} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Ionicons name="videocam-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          });
    },[])


    const openModal = () => setModalVisible(true);

    const closeModal = () => setModalVisible(false);
  
    const openCamera = async () => {
      if (hasPermission === false) {
        alert("No access to camera");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
      });
  
      if (!result.canceled) {
        setPhotoUri(result.uri); // Store the URI of the captured image
      }
  
      closeModal();
    };
  
    const openGallery = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5,
      });
  
      if (!result.canceled) {
        setPhotoUri(result.uri); // Store the URI of the selected image
      }
  
      closeModal();
    };
   
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
    <ScrollView  ref={scrollViewRef} contentContainerStyle={{flexGrow: 1}}>
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
      <Image
        source={{ uri: item?.image }}
        style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 5 }}
      />
    )}
          <Text
            style={{
              fontSize: 15,
              textAlign: 'left',
              color: 'white',
              fontWeight: '500',
            }}>
            {item?.message}
          </Text>
          <Text
            style={{
              fontSize: 9,
              textAlign: 'right',
              color: '#F0F0F0',
              marginTop: 5,
            }}>
            {formatTime(item?.timestamp)}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        marginBottom: 30,
      }}>
      <Entypo
        style={{marginRight: 7}}
        name="emoji-happy"
        size={24}
        color="gray"
      />
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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginHorizontal: 8,
        }}>
         <TouchableOpacity onPress={openModal}>
        <Entypo name="camera" size={24} color="gray" />
        </TouchableOpacity>

        <Feather name="mic" size={24} color="gray" />
      </View>

      <TouchableOpacity
  onPress={() => {
    if (message.trim()) {
      sendMessage(route?.params?.senderId, route?.params?.receiverId);
    }
  }}
  style={{
    backgroundColor: message.trim() ? '#662d91' : '#cccccc', 
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  }}
  disabled={!message.trim()} 
>
  <Text style={{ textAlign: 'center', color: 'white' }}>
    Send
  </Text>
</TouchableOpacity>
    </View>

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
};