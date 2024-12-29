import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { router, useNavigation } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../config/AuthContext';
import { getRegistrationProgress } from '../config/registrationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PreFinalScreen() {
    const [userData, setUserData] = useState();
    const {token,setToken}=useContext(AuthContext)
    const route = useRoute();
    const navigation =useNavigation();
    const backendUrl = 'http://192.168.1.38:3000';

    useEffect(() => {
        if (token) {
          router.replace('home');
        }
      }, [token, navigation]);

    useEffect(()=>{
        getAllUserData();
    },[]);

    const getAllUserData = async () => {
        try {
          const screens = [
            'Name',
            'Email',
            'Password',
            'Birth',
            
            'Gender',
            'Type',
            'Dating',
            'LookingFor',
            'Hometown',
            'Photos',
            'Prompts',
            'Religion',
            'Education'
          ]; 
          let userData = {};
    
        
          for (const screenName of screens) {
            const screenData = await getRegistrationProgress(screenName);
            if (screenData) {
              userData = {...userData, ...screenData}; 
            }
          }
         
          setUserData(userData);
        } catch (error) {
          console.error('Error retrieving user data:', error);
          return null;
        }
      };
      const clearAllScreenData = async () => {
        try {
          const screens = [
            'Name',
            'Email',
            'Birth',
            
            'Gender',
            'Type',
            'Dating',
            'LookingFor',
            'Hometown',
            'Photos',
            'Education',
            'Religion'
          ];
         
          for (const screenName of screens) {
            const key = `registration_progress_${screenName}`;
            await AsyncStorage.removeItem(key);
          }
          console.log('All screen data cleared successfully');
        } catch (error) {
          console.error('Error clearing screen data:', error);
        }
      };
      console.log('data',userData)
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    // 192.168.1.35
    const registerUser= async()=>{
      console.log('clicked')
        try {
            const response = await axios
              .post(`${backendUrl}/register`, userData, {
                timeout: 30000, 
              })
              .then(response => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem('token', token);
                setToken(token)
              });
              console.log('db ok')
              clearAllScreenData();
          } catch (error) {
            console.error('Error registering user:', error);
            throw error; 
          }
        };
  return (
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 30}}>
     <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            fontFamily: 'outfit-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 33,
            fontWeight: 'bold',
            fontFamily: 'outfit-Bold',
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>
      </View>

      <View>
        <LottieView
          source={require('../assets/love.json')}
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>

      <TouchableOpacity
        onPress={registerUser}
        style={{backgroundColor: '#900C3F', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish registering
        </Text>
      </TouchableOpacity>
    </View>
  )
}