import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {saveRegistrationProgress,getRegistrationProgress} from'../config/registrationUtils'

export default function EmailScreen() {
    const navigation =useNavigation();
    const [email, setEmail] = useState('');

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);
    useEffect(() => {
      getRegistrationProgress('Email').then(progressData => {
        if (progressData) {
          setEmail(progressData.email || '');
        }
      });
    }, []);
    const handleNext=()=>{
      if(email.trim() === ''){
        Alert.alert('Missing Information', 'Please enter your email address.', [{ text: 'OK' }]);
            return; 
        }
        saveRegistrationProgress('Email', { email });
        navigation.navigate("PasswordScreen")
    }
  return (
    <View style={{
        flex:1,
        marginTop:30,backgroundColor:'white'
    }}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Fontisto name="email" size={26} color="black" />
          </View>
          <Image
            style={{width: 100, height: 40}}
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
          }}>
          Please provide a valid email
        </Text>

        <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
          Email verification helps us keep your account secure.{' '}
          <Text style={{color: '#581845', fontWeight: '500'}}>Learn more</Text>
        </Text>
        <TextInput
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            width: 340,
            marginVertical: 10,
            fontSize: email ? 22 : 22,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'outfit-Bold',
          }}
          placeholder="Enter your email"
          placeholderTextColor={'#BEBEBE'}
        />
        <Text style={{color: 'gray', fontSize: 15, marginTop: 7}}>
          Note: You will be asked to verify your email
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}