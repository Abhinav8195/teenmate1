import {Text,View,SafeAreaView,Image,Pressable, ScrollView, TouchableOpacity,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../config/AuthContext';
import { router } from 'expo-router';

export default function Profile() {
  const backendUrl = 'https://teenmate-backend.onrender.com';
  const navigation = useNavigation();
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

  const [currentProfile, setCurrentProfile] = useState(null);
  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const { token, isLoading,setToken } = useContext(AuthContext);

  useEffect(() => {
   
    if (!token) {
      router.replace('LoginScreen');
    }
  }, [token,navigation]);
  
  const getUserDetails = async () => {
    try {
      // Make a GET request to the endpoint with the userId parameter
      const response = await axios.get(`${backendUrl}/users/${userId}`);

      // Check if the response contains the user data
      if (response.status === 200) {
        // Extract the user data from the response
        const userData = response.data.user;

        // Handle the user data as needed (e.g., set state, display in UI)
        console.log('User details:', userData);

        setCurrentProfile(userData); // Return the user data if needed
      } else {
        console.error('Error fetching user details:', response.data.message);
        return null; // Return null or handle the error appropriately
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      return null; // Return null or handle the error appropriately
    }
  };
  const logout = () => {
    clearAuthToken();
  }
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('AuthToken cleared successfully');

      setToken("");
      // Perform any necessary actions after clearing the authToken
    } catch (error) {
      console.error('Failed to clear AuthToken:', error);
    }
  };
  return (
  <SafeAreaView style={{flex:1}}>
      <ScrollView style={{ backgroundColor: 'white'}}>
     <View
        style={{
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical:20
        }}>
        <View>
          <Text style={{
            fontSize: 25,
            fontFamily:'outfit-bold'
          }}>TeenMate</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity>
          <AntDesign name="infocirlce" size={24} color="black" />
          </TouchableOpacity>
         <TouchableOpacity>
         <AntDesign name="setting" size={24} color="black" />
         </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileDetailsScreen', {
              currentProfile: currentProfile,
            })
          }>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: 'cover',
              borderColor: '#662d91',
              borderWidth: 3,
              alignSelf: 'center',
            }}
            source={{
              uri: currentProfile?.imageUrls[0],
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 12,
            }}>
            <Text style={{fontSize: 19, fontWeight: '600'}}>
              {currentProfile?.firstName}
            </Text>
            <MaterialIcons name="verified" size={22} color="#662d91" />
          </View>
        </Pressable>
      </View>

      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <Image
          style={{height: 250, width: '100%', borderRadius: 10}}
          source={require('../../assets/images/TeenMate.png')}
        />
      </View>

      

      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderColor: '#E0E0E0',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: '#006A4E',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={22}
            color="white"
          />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '600'}}>Boost</Text>
          <Text style={{color: 'gray', marginTop: 3}}>
            Get seen by 11x more people
          </Text>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderColor: '#E0E0E0',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: '#F9629F',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="rose-outline" size={22} color="white" />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '600'}}>Roses</Text>
          <Text style={{color: 'gray', marginTop: 3}}>
            2x as likely to lead to a date
          </Text>
        </View>
      </View>

      <Pressable
      onPress={logout}
        style={{
          borderColor: '#E0E0E0',
          marginTop:40,
          padding: 12,
          borderRadius: 30,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft:"auto",
          marginRight:"auto",
          width:120,
        }}>
        <Text style={{textAlign:"center",fontWeight:"500"}}>Logout</Text>
      </Pressable>
    </ScrollView>
  </SafeAreaView>
  )
}