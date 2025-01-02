import { View, Text, TouchableOpacity, TextInput, Image, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { getRegistrationProgress, saveRegistrationProgress } from '../config/registrationUtils';

export default function HomeTownScreen() {

  const navigation=useNavigation();
  const [hometown,setHometown] = useState("");

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);
    

    useEffect(() => {
        getRegistrationProgress('Hometown').then(progressData => {
          if (progressData) {
            setHometown(progressData.hometown || '');
          }
        });
      }, []);
      const handleNext=()=>{
        if (hometown.trim() === '') {
          Alert.alert('Missing Information', 'Please specify your hometown.', [{ text: 'OK' }]);
          return; 
      }
      saveRegistrationProgress('Hometown', { hometown });  
        navigation.navigate('PhotoScreen');
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
          Where's your home Town?
        </Text>

        <TextInput
          value={hometown}
          onChangeText={(text) => setHometown(text)}
          autoFocus={true}
          style={{
            width: 340,
            marginVertical: 10,
            fontSize: hometown ? 22 : 22,
            marginTop: 45,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'outfit-Bold',
          }}
          placeholder="HomeTown"
          placeholderTextColor={'#BEBEBE'}
        />


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