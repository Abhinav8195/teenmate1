import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { saveRegistrationProgress } from '../config/registrationUtils';

export default function LocationScreen() {
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const regionData = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(regionData);
      setCoordinates({ latitude, longitude });
      setLoading(false);

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBNZKjALopNHEeACWmb3Clnnz2Q-Bnd-1Y`
      )
        .then(response => response.json())
        .then(data => {
          
          if (data.results.length > 0) {
            setLocation(data.results[0].formatted_address);
          }
        })
        .catch(error => console.error('Error fetching location:', error));
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleNext = () => {
    saveRegistrationProgress("Location",{location})
    navigation.navigate('GenderScreen');
  };

  const handleMarkerDragEnd = (coordinate) => {
    setCoordinates(coordinate);
    setRegion({
      ...region,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyBNZKjALopNHEeACWmb3Clnnz2Q-Bnd-1Y`
    )
      .then(response => response.json())
      .then(data => {
        console.log('formatted', data);
        if (data.results.length > 0) {
          setLocation(data.results[0].formatted_address);
        }
      })
      .catch(error => console.error('Error fetching location:', error));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 20 }}>
       {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#581845" />
          <Text>Loading map...</Text>
        </View>
      ) : (
      <View style={{ marginTop: 70, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={26}
              color="black"
            />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'outfit-Bold',
            marginTop: 15,
          }}>
          Where do you live?
        </Text>
        {region && (
          <MapView
            region={region}
            style={{ width: '100%', height: 400, marginTop: 20, borderRadius: 5 }}>
            {coordinates && (
              <Marker
                coordinate={coordinates}
                onDragEnd={(e) => handleMarkerDragEnd(e.nativeEvent.coordinate)}
                draggable>
                <View style={{ backgroundColor: 'black', padding: 12, borderRadius: 20 }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '500',
                    }}>
                    {location}
                  </Text>
                </View>
              </Marker>
            )}
          </MapView>
        )}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{ marginTop: 20, marginLeft: 'auto' }}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{ alignSelf: 'center', marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}
