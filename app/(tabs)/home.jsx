import { View, Text, ScrollView, Pressable, Image, Button, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage'
import  axios  from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import * as Location from 'expo-location';
import ProfileCard from '../../components/ProfileCard';

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
  const backendUrl = 'https://teenmate-backend.onrender.com';
  const navigation = useNavigation();
  const [option, setOption] = useState('Compatible');
  const [userId,setUserId]=useState("");
  const [profilesData,setProfilesData]=useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      console.log('Fetched userId:', userId); // Debugging
      setUserId(userId);
    };
    fetchUser();
  }, []);
  
  const requestLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log('Fetched location:', location.coords); // Debugging
      setLocation(location.coords);
      sendLocationToBackend(location.coords);
    } catch (error) {
      console.error('Error getting location', error);
    }
  };
  
  const sendLocationToBackend = async (location) => {
    try {
      console.log('Sending location to backend:', { userId, location }); 
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
      console.error('Error updating location', error);
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
  // console.log('Profiles',profilesData);

  const handleCross = () => {
    if (currentProfileIndex < profilesData.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
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
      <ProfileCard currentProfile={currentProfile} userId={userId}/>
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