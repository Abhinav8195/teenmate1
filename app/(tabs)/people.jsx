import {StyleSheet,Text,View,SafeAreaView,Image,Pressable, ScrollView, TouchableOpacity, Dimensions, FlatList, Platform, Modal, Alert,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from '../../config/AuthContext';
import { router, useNavigation } from 'expo-router';
import ProfileCard from '../../components/ProfileCard';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Filters from '../../components/Filters';

const People = () => {
    const [currentProfile, setCurrentProfile] = useState(null);
    const { width, height } = Dimensions.get('window');
    const backendUrl = 'https://teenmate-backend.onrender.com';
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filterSettings, setFilterSettings] = useState({
      radius: 5,
      ageRange: [18, 30],
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

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

    useEffect(() => {
      if (!token) {
        router.replace('LoginScreen');
      }
    }, [token, navigation]);
  
    const { token, isLoading, setToken } = useContext(AuthContext);
  
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/${userId}`);
        if (response.status === 200) {
          const userData = response.data.user;
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

    const getNearbyUsers = async (currentLocation) => {
      try {
        const { latitude, longitude } = currentLocation;
        const response = await axios.get(`${backendUrl}/nearby-users`, {
          params: {
            latitude,
            longitude,
            radius: filterSettings.radius,
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

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
  
    const handleDistanceChange = (newRadius) => {
      setFilterSettings((prevSettings) => ({
        ...prevSettings,
        radius: newRadius,
      }));
      if (currentProfile) {
        getNearbyUsers(currentProfile.location);
      }
    };

    useEffect(() => {
      if (nearbyUsers.length > 0) {
          setCurrentProfile(nearbyUsers[0]);
      }
  }, [nearbyUsers]);

    const handleCross = () => {
      if (currentIndex < nearbyUsers.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setCurrentProfile(nearbyUsers[currentIndex + 1]);
      } else {
          Alert.alert("End of List", "No more profiles to display.");
      }
  };
    

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>
              Searching New Friend's 
            </Text>
            <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>
              Near By
            </Text>
          </View>
          <TouchableOpacity onPress={toggleModal}>
            <MaterialCommunityIcons name="tune-variant" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {
          nearbyUsers.length != 0 ?
           <>
            <ScrollView style={{ padding: 10 }}>
              <ProfileCard currentProfile={nearbyUsers[currentIndex]} />

            </ScrollView>
            <TouchableOpacity
            onPress={handleCross}
            style={{
              position: 'absolute',
              bottom: 20,
              left: 18,
              backgroundColor: 'white',
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="cross" size={25} color="#C5B358" />
          </TouchableOpacity>
           </>
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

        <Modal animationType="slide" transparent={false} visible={isModalVisible} onRequestClose={toggleModal}>
          <Filters closeModal={toggleModal} onDistanceChange={handleDistanceChange} initialDistance={filterSettings.radius} />
        </Modal>
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
    top: Platform.OS === 'android' ? '38%' : '40%', 
    zIndex: 1, 
  },
  gifImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 40,
  },
});
