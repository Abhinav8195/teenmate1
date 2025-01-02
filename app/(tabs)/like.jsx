import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import Entypo from '@expo/vector-icons/Entypo';

export default function Like() {
  const backendUrl = 'https://teenmate-backend.onrender.com';
  const navigation = useNavigation();
  const [option, setOption] = useState('Recent');
  const [userId, setUserId] = useState('');
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchReceivedLikes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/received-likes/${userId}`);
      const receivedLikes = response.data.receivedLikes;
      console.log(receivedLikes);
      setLikes(receivedLikes);
    } catch (error) {
      console.error('Error fetching received likes:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchReceivedLikes();
      }
    }, [userId]),
  );

  return (
   <SafeAreaView style={{flex:1}}>
     <ScrollView style={{  padding: 15, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'outfit-Bold', marginTop: 15 }}>
          Likes You
        </Text>
        <TouchableOpacity>
        <MaterialCommunityIcons name="tune-variant" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering for Likes */}
      {likes.length === 0 ? (
       <View style={{ marginTop: 5 }}>
       <Text style={{ color: '#808080', fontFamily: 'outfit' }}>
         When people are into you, they'll appear
       </Text>
       <Text style={{ color: '#808080', fontFamily: 'outfit' }}>
       here. Enjoy.
       </Text>

       <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:100}}>
       <Image source={require('../../assets/images/img3.png')} style={{ width: 220, height: 200}} />
        <Text style={{color:'black',fontFamily:'outfit-bold',fontSize:24}}>Let your personality shine</Text>
        <Text style={{color:'gray',fontFamily:'outfit',fontSize:15,marginTop:10}}>Showing off your personality goes a long way. Add</Text>
        <Text style={{color:'gray',fontFamily:'outfit',fontSize:15}}>Prompts to give peoplr things to talk about.</Text>

       <TouchableOpacity
               style={{
                 backgroundColor: 'black',
                 padding: 15,
                 width: '80%',
                 borderRadius: 25,
                 marginTop: 15,
               }}
             >
               <Text style={{ color: 'white', textAlign: 'center' }}>Edit your Profile</Text>
             </TouchableOpacity>
       </View>
     </View>
      ) : (
        <>
          <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: '#D0D0D0', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="filter" size={22} color="black" />
            </View>
            <TouchableOpacity
              onPress={() => setOption('Recent')}
              style={{
                borderColor: option === 'Recent' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'Recent' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'Recent' ? 'white' : '#808080',
              }}>
                Recent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption('your type')}
              style={{
                borderColor: option === 'your type' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'your type' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'your type' ? 'white' : '#808080',
              }}>
                your type
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption('Last Active')}
              style={{
                borderColor: option === 'Last Active' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'Last Active' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'Last Active' ? 'white' : '#808080',
              }}>
                Last Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption('Nearby')}
              style={{
                borderColor: option === 'Nearby' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: option === 'Nearby' ? 'black' : 'transparent',
              }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option === 'Nearby' ? 'white' : '#808080',
              }}>
                Nearby
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HandleLikeScreen', {
                  name: likes[0].userId?.firstName,
                  image: likes[0].image,
                  imageUrls: likes[0].userId?.imageUrls,
                  prompts: likes[0].userId?.prompts,
                  userId: userId,
                  selectedUserId: likes[0].userId?._id,
                  likes: likes?.length,
                })
              }
              style={{
                padding: 20,
                borderColor: '#E0E0E0',
                borderWidth: 1,
                borderRadius: 7,
              }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: '#f0f0f0',
                borderRadius: 5,
                marginBottom: 8,
                width: 145,
              }}>
                <View />
                <View>
                  <Text>Liked your photo</Text>
                </View>
              </View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {likes[0].userId?.firstName}
              </Text>
              <Image
                source={{ uri: likes[0].userId?.imageUrls[0] }}
                style={{
                  width: '100%',
                  height: 350,
                  resizeMode: 'cover',
                  borderRadius: 10,
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.upNextTitle}>Up Next</Text>
            <View style={styles.upNextContainer}>
              {likes.slice(1).map((like, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.likeItem}
                >
                  <View style={styles.likeContent}>
                    {like.comment ? (
                      <View style={styles.likeComment}>
                        <Text>{like?.comment}</Text>
                      </View>
                    ) : (
                      <View style={styles.likeCommentDefault}>
                        <Text>Liked your photo</Text>
                      </View>
                    )}
                    <Text style={styles.likeName}>
                      {like?.userId?.firstName}
                    </Text>
                  </View>
                  <View style={styles.likeImageContainer}>
                    <Image
                      source={{ uri: like.userId?.imageUrls[0] }}
                      style={styles.likeImage}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'outfit-Bold',
    marginTop: 15,
  },
  noLikesContainer: {
    marginTop: 5,
  },
  noLikesText: {
    color: '#808080',
    fontFamily: 'outfit',
  },
  noLikesImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  noLikesImage: {
    width: 220,
    height: 200,
  },
  noLikesTitle: {
    color: 'black',
    fontFamily: 'outfit-bold',
    fontSize: 24,
  },
  noLikesDescription: {
    color: 'gray',
    fontFamily: 'outfit',
    fontSize: 15,
    marginTop: 10,
  },
  editProfileButton: {
    backgroundColor: 'black',
    padding: 15,
    width: '80%',
    borderRadius: 25,
    marginTop: 15,
  },
  editProfileButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  filterOptions: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterOption: {
    borderColor: '#808080',
    borderWidth: 0.7,
    padding: 10,
    borderRadius: 20,
  },
  selectedFilterOption: {
    backgroundColor: 'black',
    borderColor: 'transparent',
  },
  filterOptionText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
  },
  selectedFilterOptionText: {
    color: 'white',
  },
  firstLikeContainer: {
    padding: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 7,
  },
  firstLikeComment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 8,
    width: 145,
  },
  firstLikeName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  firstLikeImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
  },
  upNextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'outfit-Bold',
    marginTop: 20,
  },
  upNextContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  likeItem: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    width: '48%',
  },
  likeContent: {
    padding: 12,
  },
  likeComment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F3C6',
    borderRadius: 5,
    marginBottom: 8,
    width: 140,
  },
  likeCommentDefault: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 8,
    width: 140,
  },
  likeName: {
    fontSize: 17,
    fontWeight: '500',
  },
  likeImageContainer: {
    width: '100%',
    padding: 5,
  },
  likeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});