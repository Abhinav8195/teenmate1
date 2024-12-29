import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const backendUrl = 'http://192.168.1.38:3000';
const socket = io(backendUrl);
export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  
  // Replace with your backend URL
 
  console.log(backendUrl)
  

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
    const messageData = { senderId, receiverId, message };

    // Emit message via Socket.IO
    socket.emit('sendMessage', messageData);

    // Send message to Firestore through your backend
    try {
      await axios.post(`${backendUrl}/send-message`, messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    setMessage('');
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
      scrollViewRef.current.scrollToEnd({ animated: true }); // Scroll to the end whenever messages change
    }
  }, [messages]);

  const formatTime = time => {
    if (!time) return '';
   
    if (time && time.seconds !== undefined) {
      const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000); // Convert Firestore Timestamp to Date
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return date.toLocaleString('en-US', options); // Format date to string
    }
  
    return ''; // Return empty string if time is not valid
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
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Ionicons name="videocam-outline" size={24} color="black" />
              </View>
            ),
          });
    },[])

   
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
        <Entypo name="camera" size={24} color="gray" />

        <Feather name="mic" size={24} color="gray" />
      </View>

      <TouchableOpacity
  onPress={() => {
    if (message.trim()) {
      sendMessage(route?.params?.senderId, route?.params?.receiverId);
    }
  }}
  style={{
    backgroundColor: message.trim() ? '#662d91' : '#cccccc', // Change color based on message
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
  </KeyboardAvoidingView>
);
};