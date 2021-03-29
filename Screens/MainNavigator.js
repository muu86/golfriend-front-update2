import React from 'react';
import  { 
    View, 
    StyleSheet, 
    Text, 
    Button 
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, MaterialIcons  } from '@expo/vector-icons';

import CameraStackNavigator from './Main/CameraStackNavigator';
import UserSwingDataScreen from '../Screens/Main/UserSwingDataScreen';
import CameraButton from '../Components/Buttons/CameraButton';
import SocialScreen from './Main/SocialScreen';
// import VideoRecord from '../Screens/VideoRecordScreen';

const MainStack = createBottomTabNavigator();
const MainNavigator = () => {

  return(
    <MainStack.Navigator 
      //   screenOptions={({ route }) => ({
      //     tabBarIcon: ({ focused, color, size }) => {
      //       let iconName;

      //       if (route.name === 'UserLatestSwing') {
      //         iconName = focused ? 'ios-trending-up' : 'ios-trending-up-outline';
              
      //       } else if (route.name === 'Camera'){
      //         iconName = focused ? 'camera-outline' : 'camera';
      //       } else if (route.name === 'UserSwingData'){
      //         iconName = focused ? 'ios-timer-outline' : 'ios-timer-sharp';
      //       } 
      //       return <Icon name={iconName} size={size}  color={color}/>;
      //     },
      // })}

        tabBarOptions={{ 
          // 활성화 되면 검정색 비 활성화 되면 검정색
          activeTintColor: '#90ee90',
          inactiveTintColor: 'gray',
          style: {
            height: 70,
          },
          keyboardHidesTabBar: true
        }} 
    >
      <MainStack.Screen name = "UserSwingData" component ={UserSwingDataScreen} 
        options={{ 
          title: "최근 분석",
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return (
                // <Ionicons name="bar-chart" size={30} color={color} />
                <MaterialIcons name="insert-chart" size={30} color={color} />
              )
            } else {
              return (
                <MaterialIcons name="insert-chart-outlined" size={30} color={color} />
              )
            }
          },
        }} 
      />
      <MainStack.Screen 
        name = "Camera" 
        component ={CameraStackNavigator}
        options={{
          title: "",
          tabBarIcon: ({color, size, focused}) => (
            <CameraButton focused={focused} />
          ), 
          tabBarVisible: false 
        }}
      />
      
      <MainStack.Screen name="Social" component={SocialScreen} 
        options={{ 
          title: "소셜",
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return (
                <Ionicons name="md-people" size={30} color={color} />
              )
            } else {
              return (
                <Ionicons name="md-people-outline" size={30} color={color} />
              )
            }
          },
          // tabBarVisible: false,
        }}  
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;


const styles =  StyleSheet.create({
  contaier:{
    flex:1,
    alignItems:'center'
  }
})