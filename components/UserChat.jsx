import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserChat = ({item,userId}) => {
  const navigation = useNavigation();
  return (
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
        marginVertical: 12,
      }}>
      <View>
        <Image
          style={{width: 60, height: 60, borderRadius: 35}}
          source={{uri: item?.imageUrls[0]}}
        />
      </View>

      <View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            fontFamily: 'outfit-Bold',
          }}>
          {item?.firstName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginTop: 6,
          }}>
          {`Start Chat with ${item?.firstName}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserChat;

const styles = StyleSheet.create({});