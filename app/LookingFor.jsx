import { View, Text, Pressable, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getRegistrationProgress, saveRegistrationProgress } from '../config/registrationUtils';

export default function LookingFor() {
    const [lookingFor,setLookingFor] = useState('');
    const navigation=useNavigation();
    useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
    
      useEffect(() => {
        getRegistrationProgress('LookingFor').then(progressData => {
          if (progressData) {
            setLookingFor(progressData.lookingFor || '');
          }
        });
      }, []);
      const handleNext=()=>{
        if (lookingFor.trim() === '') {
          Alert.alert('Missing Information', 'Please specify what you are looking for.', [{ text: 'OK' }]);
          return; 
      }
      saveRegistrationProgress('LookingFor', { lookingFor });
        navigation.navigate('HomeTownScreen');
      };
  return (
    <View style={{flex: 1, backgroundColor: 'white',marginTop:30}}>
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
            <AntDesign name="hearto" size={22} color="black" />
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
          What's your dating intention?
        </Text>



        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15,fontFamily:'outfit-medium'}}>Life Partner</Text>
            <Pressable onPress={() => setLookingFor('Life Partner')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Life Partner" ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15,fontFamily:'outfit-medium'}}>Long-term relationship</Text>
            <Pressable onPress={() => setLookingFor('Long-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Long-term relationship" ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15,fontFamily:'outfit-medium'}}>Long-term relationship open to short</Text>
            <Pressable onPress={() => setLookingFor('Long-term relationship open to short')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Long-term relationship open to short" ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15,fontFamily:'outfit-medium'}}>Short-term relationship open to long</Text>
            <Pressable onPress={() => setLookingFor('Short-term relationship open to long')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Short-term relationship open to long" ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15,fontFamily:'outfit-medium'}}>Short-term relationship</Text>
            <Pressable onPress={() => setLookingFor('Short-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Short-term relationship" ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15,fontFamily:'outfit-medium'}}>Figuring out my dating goals</Text>
            <Pressable onPress={() => setLookingFor('Figuring out my dating goals')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Figuring out my dating goals" ? '#581845' : '#F0F0F0'}
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
          <Text style={{fontSize: 15,fontFamily:'outfit-medium'}}>Visible on profile</Text>
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