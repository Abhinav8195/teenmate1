import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';
import axios from 'axios';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function Like() {
  const backendUrl = 'http://192.168.1.38:3000';
  const navigation = useNavigation();
  const [option, setOption] = useState('Recent');
  const [userId, setUserId] = useState('');
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchReceivedLikes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/received-likes/${userId}`);
      const receivedLikes = response.data.receivedLikes;
      console.log(receivedLikes);
      setLikes(receivedLikes);
    } catch (error) {
      console.error('Error fetching received likes:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchReceivedLikes();
      }
    }, [userId]),
  );

  return (
   <SafeAreaView style={{flex:1}}>
     <ScrollView style={{  padding: 15, backgroundColor: '#FAF9F6' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'outfit-Bold', marginTop: 15 }}>
          Likes You
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#008B8B', padding: 10, borderRadius: 30 }}>
          <SimpleLineIcons name="fire" size={24} color="white" />
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
            Boost
          </Text>
        </View>
      </View>

      {/* Conditional Rendering for Likes */}
      {likes.length === 0 ? (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#808080' }}>
            No one has sent you a like yet.
          </Text>
        </View>
      ) : (
        <>
          <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: '#D0D0D0', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="filter" size={22} color="black" />
            </View>
            <TouchableOpacity
              onPress={() => setOption('Recent')}
              style={{
                borderColor: option === 'Recent' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'Recent' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'Recent' ? 'white' : '#808080',
              }}>
                Recent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption('your type')}
              style={{
                borderColor: option === 'your type' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'your type' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'your type' ? 'white' : '#808080',
              }}>
                your type
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption('Last Active')}
              style={{
                borderColor: option === 'Last Active' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'Last Active' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'Last Active' ? 'white' : '#808080',
              }}>
                Last Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption('Nearby')}
              style={{
                borderColor: option === 'Nearby' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'Nearby' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'Nearby' ? 'white' : '#808080',
              }}>
                Nearby
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HandleLikeScreen', {
                  name: likes[0].userId?.firstName,
                  image: likes[0].image,
                  imageUrls: likes[0].userId?.imageUrls,
                  prompts: likes[0].userId?.prompts,
                  userId: userId,
                  selectedUserId: likes[0].userId?._id,
                  likes: likes?.length,
                })
              }
              style={{
                padding: 20,
                borderColor: '#E0E0E0',
                borderWidth: 1,
                borderRadius: 7,
              }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: '#f0f0f0',
                borderRadius: 5,
                marginBottom: 8,
                width: 145,
              }}>
                <View />
                <View>
                  <Text>Liked your photo</Text>
                </View>
              </View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {likes[0].userId?.firstName}
              </Text>
              <Image
                source={{ uri: likes[0].userId?.imageUrls[0] }}
                style={{
                  width: '100%',
                  height: 350,
                  resizeMode: 'cover',
                  borderRadius: 10,
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'outfit-Bold', marginTop: 20 }}>
            Up Next
          </Text>
          <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
            {likes.slice(1).map((like, index) => (
              <View key={index} style={{ marginVertical: 10, backgroundColor: 'white' }}>
                <View style={{ padding: 12 }}>
                  {like.comment ? (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      backgroundColor: '#F5F3C6',
                      borderRadius: 5,
                      marginBottom: 8,
                      width: 145,
                    }}>
                      <View />
                      <View>
                        <Text>{like?.comment}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      backgroundColor: '#f0f0f0',
                      borderRadius: 5,
                      marginBottom: 8,
                      width: 145,
                    }}>
                      <View />
                      <View>
                        <Text>Liked your photo</Text>
                      </View>
                    </View>
                  )}

                  <Text style={{ fontSize: 17, fontWeight: '500' }}>
                    {like?.userId?.firstName}
                  </Text>
                </View>

                <View style={{ width: '100%' }}>
                  <Image
                    source={{ uri: like.userId?.imageUrls[0] }}
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
   </SafeAreaView>
  );
}
