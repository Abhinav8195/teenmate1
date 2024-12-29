import { View, Text,  Pressable, Image,  StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';

const ProfileCard = ({currentProfile,userId}) => {
     const navigation = useNavigation();
  return (
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
  )
}

export default ProfileCard

const styles = StyleSheet.create({})