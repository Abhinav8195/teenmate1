import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import UserChat from '../../components/UserChat';

export default function Chat() {
  const backendUrl = 'https://teenmate-backend.onrender.com';
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/get-matches/${userId}`
      );
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchMatches();
      }
    }, [userId])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView contentContainerStyle={{ padding: 12, flexGrow: 1,backgroundColor:'white' }}>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={{ fontSize: 24, fontFamily: 'outfit-bold' }}>
          Chats
        </Text>
        <View style={{ marginVertical: 12 }}>
          {matches.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 120 }}>
              <Image source={require('../../assets/images/img4.png')} style={{ width: 150, height: 130, marginBottom: 20 }} />
              <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
                Connections start here
              </Text>
              <Text style={{ color: 'gray', textAlign: 'center', marginTop: 10 }}>
                When you both swipe right on each other, you'll match.
              </Text>
              <Text style={{ color: 'gray', textAlign: 'center' }}>
                Here's where you can chat.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  padding: 15,
                  width: '80%',
                  borderRadius: 25,
                  marginTop: 15,
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Find your person</Text>
              </TouchableOpacity>
            </View>
          ) : (
            matches.map((item, index) => (
              <UserChat key={index} userId={userId} item={item} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Add your styles here if needed
});
