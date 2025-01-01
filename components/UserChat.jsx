import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserChat = ({item,userId}) => {
  const navigation = useNavigation();
  return (

    <View style={styles.container}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatRoom', {
          image: item?.imageUrls[0],
          name: item?.firstName,
          receiverId: item?._id,
          senderId: userId,
        })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}>
      <View>
        <Image
          style={{width: 55, height: 55, borderRadius: 35}}
          source={{uri: item?.imageUrls[0]}}
        />
      </View>

      <View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 17,
            fontFamily: 'outfit-bold',
          }}>
          {item?.firstName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color:'gray'
          }}>
          {`Start Chat with ${item?.firstName}`}
        </Text>
      </View>
    </TouchableOpacity>
    <View style={styles.separator} />
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 12,
  },
  container:{
    flex:1,
    marginTop:10
  }
});