import { View, Text, TouchableOpacity, Pressable, Image, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { getRegistrationProgress, saveRegistrationProgress } from '../config/registrationUtils';

export default function GenderScreen() {
    const navigation=useNavigation();
    const [gender, setGender] = useState('');

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);
    useEffect(() => {
        getRegistrationProgress('Gender').then(progressData => {
          if (progressData) {
            setGender(progressData.gender || '');
          }
        });
      }, []);
    const handleNext = () => {
      if (gender.trim() === '') {
        Alert.alert('Missing Information', 'Please select your gender.', [{ text: 'OK' }]);
        return; 
      }
      saveRegistrationProgress('Gender', { gender });
        navigation.navigate('TypeScreen');
      };
  return (
  <SafeAreaView style={{flex:1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={26}
              color="black"
            />
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
          Which gender descibes you the best?
        </Text>

        <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
          TeenMate users are matched based on these three gender groups. You can
          add more about gender after
        </Text>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Men</Text>
            <Pressable onPress={() => setGender('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Men' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Women</Text>
            <Pressable onPress={() => setGender('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Women' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Non-binary</Text>
            <Pressable onPress={() => setGender('Non-binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non-binary' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AntDesign name="checksquare" size={26} color="#581845" />
          <Text style={{fontSize: 15}}>Visible on profile</Text>
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
  </SafeAreaView>
  )
}