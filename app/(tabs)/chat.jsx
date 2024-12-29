import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import UserChat from '../../components/UserChat';

export default function Chat() {
  const backendUrl = 'http://192.168.1.38:3000';
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
   <SafeAreaView>
     <ScrollView style={{ padding: 12 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: 'outfit-medium' }}>
          Your Matches
        </Text>
        <View style={{ marginVertical: 12 }}>
          {matches.length === 0 ? (
            <Text style={{ fontSize: 16, color: '#808080', textAlign: 'center' }}>
              No matches found yet.
            </Text>
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
