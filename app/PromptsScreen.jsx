import { View, Text, Image, Pressable, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { saveRegistrationProgress } from '@/config/registrationUtils';

export default function PromptsScreen() {
    
    const route = useRoute();
    const navigation =useNavigation();
    
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    const handleNext = () => {
      const allPromptsFilled = route?.params?.prompts?.every(prompt => prompt?.question && prompt?.answer);
      
      if (allPromptsFilled) {
        saveRegistrationProgress('Prompts', { prompts: route?.params?.prompts });
        navigation.navigate('UniversityScreen');
      } else {
        Alert.alert('Incomplete Prompts', 'Please fill out all prompts before proceeding.');
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
            <AntDesign name="eye" size={22} color="black" />
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
          Write your profile answers
        </Text>

        <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>
          {route?.params?.prompts ? (
            route?.params?.prompts?.map((item, index) => (
              <Pressable
                onPress={() => navigation.navigate('ShowPromptsScreen')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  {item?.question}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  {item?.answer}
                </Text>
              </Pressable>
            ))
          ) : (
            <View>
              <Pressable
                onPress={() => navigation.navigate('ShowPromptsScreen')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And write your own answer
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('ShowPromptsScreen')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                  marginVertical: 15
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And write your own answer
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('ShowPromptsScreen')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And write your own answer
                </Text>
              </Pressable>
            </View>
          )}
          {/* {route?.params?.prompts?.map((item, index) => (
            <Pressable
              onPress={() => navigation.navigate('ShowPromptsScreen')}
              style={{
                borderColor: '#707070',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderRadius: 10,
                height: 70,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontStyle: 'italic',
                  fontSize: 15,
                }}>
                {item?.question}
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontStyle: 'italic',
                  fontSize: 15,
                  marginTop: 3,
                }}>
                {item?.answer}
              </Text>
            </Pressable>
          ))}

          <Pressable
            onPress={() => navigation.navigate('ShowPromptsScreen')}
            style={{
              borderColor: '#707070',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderRadius: 10,
              height: 70,
            }}>
            <Text
              style={{
                color: 'gray',
                fontWeight: '600',
                fontStyle: 'italic',
                fontSize: 15,
              }}>
              Select a Prompt
            </Text>
            <Text
              style={{
                color: 'gray',
                fontWeight: '600',
                fontStyle: 'italic',
                fontSize: 15,
                marginTop: 3,
              }}>
              And write your own answer
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('ShowPromptsScreen')}
            style={{
              borderColor: '#707070',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderRadius: 10,
              height: 70,
            }}>
            <Text
              style={{
                color: 'gray',
                fontWeight: '600',
                fontStyle: 'italic',
                fontSize: 15,
              }}>
              Select a Prompt
            </Text>
            <Text
              style={{
                color: 'gray',
                fontWeight: '600',
                fontStyle: 'italic',
                fontSize: 15,
                marginTop: 3,
              }}>
              And write your own answer
            </Text>
          </Pressable> */}
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