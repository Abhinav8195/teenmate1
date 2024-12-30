import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import React, { useState, useRef } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import Slider from '@react-native-community/slider';

const Filters = ({ closeModal,onDistanceChange }) => {
  const [distance, setDistance] = useState(5); 
  const sliderValue = useRef(distance); 

  const handleSliderChange = (value) => {
    sliderValue.current = value; 
  };

  const handleSliderEnd = () => {
    setDistance(sliderValue.current); 
    if (onDistanceChange) {
      onDistanceChange(sliderValue.current); 
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Entypo name="cross" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Narrow Your Search</Text>
        </View>
      </View>

      <View style={{ padding: 15 }}>
        <Text style={{ color: 'gray', fontSize: 17, fontFamily: 'outfit-bold' }}>
          How far away are you searching for?
        </Text>

     
        <View style={{ borderWidth: 1, borderColor: 'gray', padding: 15, borderRadius: 10 ,marginTop:20}}>
          <Text style={{ fontSize: 16, fontFamily: 'outfit' }}>
            Up to {distance} Kilometers away
          </Text>

        
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={100} 
            step={1} 
            value={distance}
            onValueChange={handleSliderChange} 
            onSlidingComplete={handleSliderEnd} 
            minimumTrackTintColor="#C5B358" 
            maximumTrackTintColor="#000000" 
            thumbTintColor="#C5B358" 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    
    padding: 20,
    position: 'relative',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    gap: Platform.OS==='android'?45:77,
  },
  closeButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    textAlign: 'left',
  },
});
