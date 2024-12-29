import { Text, View } from "react-native";
import BasicInfo from './BasicInfo'
import PromptsScreen from './PromptsScreen'
import LoginScreen from './LoginScreen'
import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/config/AuthContext";
export default function Index() {
  const {isLoading,token}=useContext(AuthContext)
  return (
    <View style={{
      flex: 1,
    }}>
     {/* {token===null || token === '' ? <Redirect href={'/home'} /> : <BasicInfo />} */}
     {/* <BasicInfo /> */}
     <LoginScreen/>
    </View>
  );
}
