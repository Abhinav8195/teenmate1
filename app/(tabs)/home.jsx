import { View, Text, ScrollView, Pressable, Image, Button, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage'
import  axios  from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';

const calculateAge = (dateOfBirth) => {
  const [day, month, year] = dateOfBirth.split('/').map(Number);
  const dob = new Date(year, month - 1, day);
  const today = new Date();
  
  let age = today.getFullYear() - dob.getFullYear();
  if (today.getMonth() < dob.getMonth() || 
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
  }
  
  return age;
};
export default function Home() {
  const backendUrl = 'http://192.168.1.38:3000';
  const navigation = useNavigation();
  const [option, setOption] = useState('Compatible');
  const [userId,setUserId]=useState("");
  const [profilesData,setProfilesData]=useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [location, setLocation] = useState(null);

 // Fetch user ID on component mount
 useEffect(() => {
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
  };
  fetchUser();
}, []);

const requestLocation = async () => {
  try {
    // Request permission for location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    // Get the user's location
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);  // Store the location in state

    // Once the location is fetched, send it to the backend
    sendLocationToBackend(location.coords);

  } catch (error) {
    console.error("Error getting location", error);
  }
};

// Function to send location to backend
const sendLocationToBackend = async (location) => {
  try {
    const response = await axios.post(`${backendUrl}/updateLocation`, {
      userId,
      latitude: location.latitude,
      longitude: location.longitude,
    });

    if (response.status === 200) {
      console.log('Location updated successfully');
    } else {
      console.log('Failed to update location');
    }
  } catch (error) {
    console.error("Error updating location", error);
  }
};


useFocusEffect(
  useCallback(() => {
    if (userId) {
      fetchMatches();
      requestLocation();  
    }
  }, [userId])
);

const fetchMatches = async () => {
  try {
    const response = await axios.get(`${backendUrl}/matches?userId=${userId}`);
    const matches = response.data.matches;
    const profilesWithAge = matches.map(profile => ({
      ...profile,
      age: calculateAge(profile.dateOfBirth) 
  }));
  setProfilesData(profilesWithAge);
    setProfilesData(matches);
  } catch (error) {
    console.error("ERROR", error);
  }
};
console.log(backendUrl)
useEffect(() => {
  if (userId) {
    fetchMatches();
  }
}, [userId]);

  const currentProfile = profilesData[currentProfileIndex];

 useEffect(() => {
  if (profilesData.length > 0) {
    setCurrentProfileIndex(0); 
  }
}, [profilesData]);
  console.log('Profiles',profilesData);

  const handleCross = () => {
    // Move to the next profile
    if (currentProfileIndex < profilesData.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // If at the end, reset to the first profile
      setCurrentProfileIndex(0);
    }
  };
  

  useFocusEffect(
    useCallback(()=>{
      console.log('i call');
      if(userId){
        fetchMatches();
      }
    },[userId])
  );
  const refreshMatches = () => {
    fetchMatches(); 
  };
  if (profilesData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
        <Image source={require('../../assets/images/img1.png')} style={{ width: 150, height: 130, marginBottom: 20 }} />
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
        Why not adjust those filters?
      </Text>
      <Text style={{ color: 'gray', textAlign: 'center', marginTop: 10, paddingHorizontal: 20 }}>
        You've seen everyone nearby. But, never fear, someone great could be just outside your filters.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 15,
          width: '80%',
          borderRadius: 25,
          marginTop: 15,
        }}
        onPress={refreshMatches}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Adjust your filters</Text>
      </TouchableOpacity>
    </View>
    );
  }
  return (
    <SafeAreaView>
    <ScrollView >
      <View
        style={{padding: 10,flexDirection: 'row',alignItems: 'center',gap: 10,
        }}>
        <View
          style={{ width: 38,height: 38,borderRadius: 19,backgroundColor: '#D0D0D0',justifyContent: 'center',alignItems: 'center',
          }}>
          <Ionicons name="sparkles-sharp" size={22} color="black" />
        </View>
        <Pressable
          onPress={() => setOption('Compatible')}
          style={{
            borderColor: option == 'Compatible' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Compatible' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Compatible' ? 'white' : '#808080',
            }}>
            Compatible
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('Active Today')}
          style={{
            borderColor: option == 'Active Today' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor:
              option == 'Active Today' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Active Today' ? 'white' : '#808080',
            }}>
            Active Today
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('New here')}
          style={{
            borderColor: option == 'New here' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'New here' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'New here' ? 'white' : '#808080',
            }}>
            New here
          </Text>
        </Pressable>
      </View>
      <View style={{marginHorizontal: 12, marginVertical: 12}}>
        {/* {profiles?.map((item, index) => ( */}
        <>
          <View>
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
                  {currentProfile?.firstName}
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                }}>
                <Entypo
                  name="dots-three-horizontal"
                  size={22}
                  color="black"
                />
              </View>
            </View>

            <View style={{marginVertical: 15}}>
              <View>
                {currentProfile?.imageUrls?.length > 0 && (
                  <View>
                    <Image
                      style={{
                        width: '100%',
                        height: 350,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: currentProfile?.imageUrls[0],
                      }}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate('SendLikeScreen', {
                          image: currentProfile?.imageUrls[0],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
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
                    </Pressable>
                  </View>
                )}
              </View>

              <View style={{marginVertical: 15}}>
                {currentProfile?.prompts.slice(0, 1).map(prompt => (
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
                    <View
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
                    </View>
                  </>
                ))}
              </View>

              {/* profile details to come here */}
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    alignItems: 'center',
                    gap: 20,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <MaterialCommunityIcons
                      name="cake-variant-outline"
                      size={22}
                      color="black"
                    />
                    <Text style={{fontSize: 15}}>{currentProfile?.dateOfBirth}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Ionicons name="person-outline" size={20} color="black" />
                    <Text style={{fontSize: 15}}>
                      {currentProfile?.gender}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Ionicons name="magnet-outline" size={20} color="black" />
                    <Text style={{fontSize: 15}}>{currentProfile?.type}</Text>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Octicons name="home" size={20} color="black" />
                    <Text style={{fontSize: 15}}>{currentProfile?.hometown}</Text>
                  </View> */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="bag-add-outline" size={20} color="black" />
                  <Text>{currentProfile?.Job}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <SimpleLineIcons
                    name="graduation"
                    size={22}
                    color="black"
                  />
                  <Text>{currentProfile?.University}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="book-outline" size={20} color="black" />
                  <Text>{currentProfile?.religion}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="home-outline" size={20} color="black" />
                  <Text>{currentProfile?.hometown}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Feather name="search" size={20} color="black" />
                  <Text>{currentProfile?.lookingFor}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="heart-outline" size={20} color="black" />
                  <Text>Monogamy</Text>
                </View>
              </View>

              <View>
                {currentProfile?.imageUrls?.slice(1, 3).map((item, index) => (
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

                    <Pressable
                      onPress={() =>
                        navigation.navigate('SendLikeScreen', {
                          image: currentProfile?.imageUrls[index + 1],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
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
                    </Pressable>
                  </View>
                ))}
              </View>

              <View style={{marginVertical: 15}}>
                {currentProfile?.prompts.slice(1, 2).map(prompt => (
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
                    <View
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
                    </View>
                  </>
                ))}
              </View>

              <View>
                {currentProfile?.imageUrls?.slice(3, 4).map((item, index) => (
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
                    <Pressable
                      onPress={() =>
                        navigation.navigate('SendLikeScreen', {
                          image: currentProfile?.imageUrls[index + 3],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
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
                    </Pressable>
                  </View>
                ))}
              </View>
              <View style={{marginVertical: 15}}>
                {currentProfile?.prompts.slice(2, 3).map(prompt => (
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
                    <View
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
                    </View>
                  </>
                ))}
              </View>

              <View>
                {currentProfile?.imageUrls?.slice(4, 7).map((item, index) => (
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
                    <Pressable
                      onPress={() =>
                        navigation.navigate('SendLikeScreen', {
                          image: currentProfile?.imageUrls[index + 4],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
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
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      
      </View>
    </ScrollView>
    <Pressable
      onPress={handleCross}
      style={{
        position: 'absolute',
        bottom: 15,
        left: 12,
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Entypo name="cross" size={25} color="#C5B358" />
    </Pressable>
  </SafeAreaView>
);
};