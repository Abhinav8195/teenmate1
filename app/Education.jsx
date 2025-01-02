import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, useRouter } from 'expo-router';
import {saveRegistrationProgress,getRegistrationProgress} from'../config/registrationUtils'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Education() {
    const [Job, setJob] = useState('');
    const [University, setUniversity] = useState('');
    const router=useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      getRegistrationProgress('Education').then(progressData => {
        if (progressData) {
          setJob(progressData.Job || '');
          setUniversity(progressData.University || '');
        }
      });
    }, []);
    const handleNext = () => {
        if (Job.trim() !== '' && University.trim() !== '') {
            saveRegistrationProgress('Education', { Job, University });
            navigation.navigate('PreFinalScreen');
        } else {
            Alert.alert("Field Required", "Please fill in both your current job or study status and your university or college.");
        }
    };
    return (
      
       <SafeAreaView style={{flex:1}}>
         <ScrollView style={{flex:1,backgroundColor:'white',}}>
        
  
        <View style={{
          marginTop:70,marginHorizontal:20
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
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'outfit-Bold',
              }}>
              Are you currently studying or working?
            </Text>
            <TextInput
              autoFocus={true}
              value={Job}
              onChangeText={text => setJob(text)}
              style={{
                width: 340,
                marginVertical: 10,
                fontSize: Job ? 18 : 18,
                marginTop: 25,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingBottom: 10,
                fontFamily: 'GeezaPro-Bold',
              }}
              placeholder="Tell us what you are up to right now."
              placeholderTextColor={'#BEBEBE'}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'outfit-Bold',
              }}>
              Which university or college are you currently attending or have attended?
            </Text>
            <TextInput
             value={University} 
             onChangeText={text => setUniversity(text)}
              style={{
                width: 340,
                marginVertical: 10,
                fontSize: Job ? 18 : 18,
                marginTop: 25,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingBottom: 10,
                fontFamily: 'outfit-Bold',
              }}
              placeholder="Please share the name of your university."
              placeholderTextColor={'#BEBEBE'}
            />
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
      </ScrollView>
       </SafeAreaView>
     
    )
  }