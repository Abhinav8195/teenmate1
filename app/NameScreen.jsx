import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, useRouter } from 'expo-router';
import {saveRegistrationProgress,getRegistrationProgress} from'../config/registrationUtils'

export default function NameScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router=useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, []);
  const handleNext = () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      Alert.alert('Missing Information', 'Please fill in both fields.', [{ text: 'OK' }]);
      return; 
    }
    saveRegistrationProgress('Name', { firstName, lastName });
    navigation.navigate('EmailScreen');
  };
  return (
    
      <View style={{flex:1,backgroundColor:'white',marginTop:30}}>
      <Text style={{
        marginTop:50,textAlign:'center',color:'gray'
      }}>NO BACKGROUND CHECKS ARE CONDUCTED</Text>

      <View style={{
        marginTop:30,marginHorizontal:20
      }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="newspaper-variant-outline" size={26} color="black" />
          </View>
          <Image style={{
            width: 100, height: 40
          }} 
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
          }}
          />
         
        </View>
      
      <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'outfit-Bold',
            }}>
            What's your name?
          </Text>
          <TextInput
            autoFocus={true}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={{
              width: 340,
              marginVertical: 10,
              fontSize: firstName ? 22 : 22,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
            }}
            placeholder="First name (required)"
            placeholderTextColor={'#BEBEBE'}
          />
          <TextInput
           value={lastName} 
           onChangeText={text => setLastName(text)}
            style={{
              width: 340,
              marginVertical: 10,
              fontSize: firstName ? 22 : 22,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'outfit-Bold',
            }}
            placeholder="Last name"
            placeholderTextColor={'#BEBEBE'}
          />
          <Text style={{fontSize: 15, color: 'gray', fontWeight: '500'}}>
            Last match is optional.
          </Text>
        </View>
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