import { View, Text, Image, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { getRegistrationProgress, saveRegistrationProgress } from '../config/registrationUtils';

export default function TypeScreen() {
    const [type, setType] = useState('');
    const navigation =useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    useEffect(() => {
        getRegistrationProgress('Type').then(progressData => {
          if (progressData) {
            setType(progressData.type || '');
          }
        });
      }, []);
    const handleNext = () => {
      if (type.trim() === '') {
        Alert.alert('Missing Information', 'Please select your type.', [{ text: 'OK' }]);
        return; 
    }
    saveRegistrationProgress('Type', { type });
        navigation.navigate('DatingType')
    }
  return (
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 30}}>
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
          What's your sexuality?
        </Text>

        <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
          TeenMate users are matched based on these three gender groups. You can
          add more about gender after
        </Text>

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Straight</Text>
            <Pressable onPress={() => setType('Straight')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Straight' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Gay</Text>
            <Pressable onPress={() => setType('Gay')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Gay' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Lesbian</Text>
            <Pressable onPress={() => setType('Lesbian')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Lesbian' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Bisexual</Text>
            <Pressable onPress={() => setType('Bisexual')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Bisexual' ? '#581845' : '#F0F0F0'}
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
  )
}