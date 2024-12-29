import {StyleSheet,Text,View,SafeAreaView,Image,Pressable, ScrollView, TouchableOpacity, Dimensions, FlatList, Platform,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from '../../config/AuthContext';
import { router, useNavigation } from 'expo-router';
import ProfileCard from '../../components/ProfileCard'

const People = () => {
 
    const [currentProfile, setCurrentProfile] = useState(null);
    const { width, height } = Dimensions.get('window');
    const backendUrl = 'https://teenmate-backend.onrender.com';
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [nearbyUsers, setNearbyUsers] = useState([]);


    useEffect(() => {
      const fetchUser = async () => {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      };
  
      fetchUser();
    }, []);
  

    useEffect(() => {
      if (userId) {
        getUserDetails();
      }
    }, [userId]);
  
    const { token, isLoading,setToken } = useContext(AuthContext);
  
    useEffect(() => {
     
      if (!token) {
        router.replace('LoginScreen');
      }
    }, [token,navigation]);
    
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/${userId}`);
        if (response.status === 200) {
          const userData = response.data.user;
          // console.log('User details:', userData);
          setCurrentProfile(userData);
          getNearbyUsers(userData.location);
        } else {
          console.error('Error fetching user details:', response.data.message);
          return null; 
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        return null; 
      }
    };

    //get
    const getNearbyUsers = async (currentLocation) => {
      try {
        const radius = 5; // Define the radius in kilometers
        const { latitude, longitude } = currentLocation;
        const response = await axios.get(`${backendUrl}/nearby-users`, {
          params: {
            latitude,
            longitude,
            radius,
            userId, 
          },
        });
    
        if (response.status === 200) {
          setNearbyUsers(response.data.nearbyUsers); 
          console.log('Nearby users:', response.data.nearbyUsers); 
        } else {
          console.error('Error fetching nearby users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching nearby users:', error.message);
      } finally {
        setLoading(false); 
      }
    };

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ padding: 15 }}>
      <Text style={{ fontSize: 18, fontFamily: 'outfit-bold' }}>
        Searching New Friend's Near By
      </Text>
    </View>
   


          {
            nearbyUsers.length !=0 ?
            
           <View style={{padding:10}}>
            <FlatList
            data={nearbyUsers}
            renderItem={({ item }) => <ProfileCard currentProfile={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.userList}/>
            
            <Pressable
            onPress={'handleCross'}
            style={{
              position: 'absolute',
              bottom: 80,
              left: 18,
              backgroundColor: 'white',
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="cross" size={25} color="#C5B358" />
          </Pressable>
           </View>
            
            : <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: currentProfile?.imageUrls[0],
            }}
          />
          <Image
            source={require('../../assets/images/a2.gif')}
            style={styles.gifImage}
          />
        </View>
          }
  </SafeAreaView>
);
};

export default People;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f8f6f2',
},
imageContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8f6f2',
  position: 'relative',
},
profileImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
  resizeMode: 'cover',
  borderColor: '#662d91',
  borderWidth: 3,
  position: 'absolute', 
  top: Platform.OS==='android'?'38%':'40%', 
  zIndex: 1, 
},
gifImage: {
  width: '100%',
  height: '80%',
  resizeMode: 'contain',
  marginBottom: 40,
},
});