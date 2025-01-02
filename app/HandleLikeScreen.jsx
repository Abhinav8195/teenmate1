import { View, Text, Pressable, ScrollView, Image, Alert, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HandleLikeScreen() {
  const backendUrl = 'https://teenmate-backend.onrender.com';
  // const backendUrl = 'http://192.168.1.38:3000';
    const route = useRoute();
    const navigation = useNavigation();
    console.log(route?.params);
    const createMatch = async () => {
      try {
        const currentUserId = route?.params?.userId; 
        const selectedUserId = route?.params?.selectedUserId;
        const response = await axios.post(`${backendUrl}/create-match`, {
          currentUserId,
          selectedUserId,
        });
        if (response.status === 200) {
          navigation.goBack();
        } else {
          console.error('Failed to create match');
        }
      } catch (error) {
        console.error('Error creating match:', error);
      }
    };

    const handleDelete = async () => {
    try {
      const currentUserId = route?.params?.userId;
      const likedUserId = route?.params?.selectedUserId;
      const response = await axios.delete(`${backendUrl}/delete-like`, {
        data: {
          userId: currentUserId,
          likedUserId,
        },
      });
      if (response.status === 200) {
        navigation.goBack();
      } else {
        console.error('Failed to delete like request');
      }
    } catch (error) {
      console.error('Error deleting like request:', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Request?',
      'Are you sure you want to delete this dating request? It’s hard to find good people.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: handleDelete },
      ]
    );
  };

    const match = () => {
      Alert.alert('Accept Request?', `Match with ${route?.params?.name}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: createMatch},
      ]);
      // navigation.goBack()
    };
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView
      style={{flex: 1, backgroundColor: 'white',  padding: 12}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>
          All {route?.params?.likes}
        </Text>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 12}}>
        <Image
          style={{
            width: '100%',
            height: 100,
            borderRadius: 7,
            resizeMode: 'cover',
          }}
          source={{uri: route?.params.image}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
            marginBottom: 8,
            width: 145,
            position: 'absolute',
            bottom: -22,
          }}>
          <View />
          <View>
            <Text>Liked your photo</Text>
          </View>
        </View>
      </View>

      <View style={{marginVertical: 25}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              {route?.params?.name}
            </Text>
            <View
              style={{
                backgroundColor: '#452c63',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 20,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                new here
              </Text>
            </View>
          </View>
          <TouchableOpacity
          onPress={confirmDelete}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}>
           <Entypo name="circle-with-cross" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 15}}>
          <View>
            {route?.params?.imageUrls?.length > 0 && (
              <View>
                <Image
                  style={{
                    width: '100%',
                    height: 350,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: route?.params?.imageUrls[0],
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{marginVertical: 15}}>
            {route?.params?.prompts.slice(0, 1).map(prompt => (
              <>
                <View
                  key={prompt.id}
                  style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 10,
                    height: 150,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    {prompt.question}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: 20,
                    }}>
                    {prompt.answer}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    // Shadow properties for Android
                    elevation: 5,
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </>
            ))}
          </View>

          {/* profile details to come here */}

          <View>
            {route?.params?.imageUrls?.slice(1, 3).map((item, index) => (
              <View key={index} style={{marginVertical: 10}}>
                <Image
                  style={{
                    width: '100%',
                    height: 350,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item,
                  }}
                />

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={{marginVertical: 15}}>
            {route?.params?.prompts.slice(1, 2).map(prompt => (
              <>
                <View
                  key={prompt.id}
                  style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 10,
                    height: 150,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    {prompt.question}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: 20,
                    }}>
                    {prompt.answer}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    // Shadow properties for Android
                    elevation: 5,
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </>
            ))}
          </View>

          <View>
            {route?.params?.imageUrls?.slice(3, 4).map((item, index) => (
              <View key={index} style={{marginVertical: 10}}>
                <Image
                  style={{
                    width: '100%',
                    height: 350,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{marginVertical: 15}}>
            {route?.params?.prompts.slice(2, 3).map(prompt => (
              <>
                <View
                  key={prompt.id}
                  style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 10,
                    height: 150,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    {prompt.question}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: 20,
                    }}>
                    {prompt.answer}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    // Shadow properties for Android
                    elevation: 5,
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </>
            ))}
          </View>

          <View>
            {route?.params?.imageUrls?.slice(4, 7).map((item, index) => (
              <View key={index} style={{marginVertical: 10}}>
                <Image
                  style={{
                    width: '100%',
                    height: 350,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="hearto" size={25} color="#C5B358" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* <View
            style={{
              position:"absolute",
              bottom: 10,
              left: 10,
              backgroundColor: 'white',
              width: 42,
              height: 42,
              borderRadius: 21,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="cross" size={25} color="#C5B358" />
          </View> */}
      </View>
    </ScrollView>

    <TouchableOpacity
      onPress={match}
      style={{
        position: 'absolute',
        bottom: 45,
        right: 12,
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="message-outline"
        size={25}
        color="#C5B358"
      />
    </TouchableOpacity>
  </SafeAreaView>
);
};
