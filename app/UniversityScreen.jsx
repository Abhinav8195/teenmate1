import { View, Text, Image, Pressable, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getRegistrationProgress, saveRegistrationProgress } from '../config/registrationUtils';

export default function UniversityScreen() {
    const [religion, setReligion] = useState('');
    const navigation =useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    useEffect(() => {
        getRegistrationProgress('Religion').then(progressData => {
          if (progressData) {
            setReligion(progressData.religion || '');
          }
        });
      }, []);
      const handleNext = () => {
        if (religion.trim() !== '') {
          saveRegistrationProgress('Religion', { religion });
          navigation.navigate('Education');
        } else {
          Alert.alert('Incomplete Selection', 'Please select a religion before proceeding.');
        }
      };
  return (
  <SafeAreaView style={{flex:1}}>
      <View style={{flex: 1, backgroundColor: 'white', }}>
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
            <MaterialIcons
              name="menu-book"
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
          What's your Religion?
        </Text>

    

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Hinduism</Text>
            <Pressable onPress={() => setReligion('Hinduism')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Hinduism' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Sikhism</Text>
            <Pressable onPress={() => setReligion('Sikhism')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Sikhism' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Christianity</Text>
            <Pressable onPress={() => setReligion('Christianity')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Christianity' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Buddhism</Text>
            <Pressable onPress={() => setReligion('Buddhism')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Buddhism' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Jainism</Text>
            <Pressable onPress={() => setReligion('Jainism')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Jainism' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Taoism</Text>
            <Pressable onPress={() => setReligion('Taoism')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Taoism' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Monotheism</Text>
            <Pressable onPress={() => setReligion('Monotheism')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Monotheism' ? '#581845' : '#F0F0F0'}
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