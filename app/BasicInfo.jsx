import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function BasicInfo() {
    const navigation = useNavigation();
    const router=useRouter();

    const handleNavigate=()=>{
        router.push('/NameScreen')
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>You're one of a kind.</Text>
                <Text style={[styles.headerText, styles.subHeaderText]}>Your profile should be too.</Text>
            </View>
            <View style={styles.lottieContainer}>
                <LottieView
                    style={styles.lottie}
                    source={require("../assets/love.json")}
                    autoPlay
                    loop
                    speed={0.7}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.buttonText}>Enter Basic Info</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between', 
    },
    textContainer: {
        marginTop: 80,
    },
    headerText: {
        fontSize: 32,
        fontFamily: 'outfit-bold',
        marginLeft: 20,
    },
    lottieContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        height: 260,
        width: 300,
    },
    button: {
        backgroundColor: '#900C3F',
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'outfit-medium',
        fontSize: 15,
    },
});
