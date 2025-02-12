import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function SendLikeScreen() {
    const route = useRoute();
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const userId = route?.params?.userId;
  console.log(route.params?.userId);
  const backendUrl = 'https://teenmate-backend.onrender.com';

  const likeProfile = async () => {
    try {
      const response = await axios.post(`${backendUrl}/like-profile`, {
        userId: route.params.userId,
        likedUserId: route.params.likedUserId,
        image: route?.params?.image,
        comment: comment,
      });
      console.log(response.data.message); 
      if (response.status == 200) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error liking profile:', error);
    }
  };

  return (
    <View  style={{flex: 1, backgroundColor: '#FAF9F6',marginTop:30}}>
      <View
        style={{marginTop: 'auto', marginBottom: 'auto', marginHorizontal: 40}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          {route?.params?.name}
        </Text>
        <Image
          style={{
            width: '100%',
            height: 350,
            resizeMode: 'cover',
            borderRadius: 10,
            marginTop: 20,
          }}
          source={{
            uri: route?.params?.image,
          }}
        />
        <TextInput
          value={comment}
          onChangeText={text => setComment(text)}
          placeholder="Add a comment"
          style={{
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 14,
            fontSize: comment ? 17 : 17,
          }}
        />

        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFC0CB',
              paddingHorizontal: 14,
              paddingVertical: 10,
              gap: 4,
              borderRadius: 22,
            }}>
            <Text>1</Text>
            <Ionicons name="rose-outline" size={22} color="black" />
          </View>
          <Pressable
            onPress={likeProfile}
            style={{
              backgroundColor: '#FFFDD0',
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              Send Like
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}