import React from 'react';
import  { 
    View, 
    StyleSheet, 
    Text, 
    Button 
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import UserLatestSwingScreen from '../Screens/Main/UserLatestSwingScreen';
import CameraScreen from './Main/CameraScreen';
import CameraButton from '../Components/Buttons/CameraButton';
import UserSwingDataScreen from './Main/UserSwingDataScreen';
import CameraButtonContext from '../Context/CameraButtonContext';
// import VideoRecord from '../Screens/VideoRecordScreen';

const MainStack = createBottomTabNavigator();
const MainNavigator = () => {

  return(
    <CameraButtonContext.Provider value={true}>
      <MainStack.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'UserLatestSwing') {
                iconName = focused ? 'ios-trending-up' : 'ios-trending-up-outline';
                
              } else if (route.name === 'Camera'){
                iconName = focused ? 'camera-outline' : 'camera';
              } else if (route.name === 'UserSwingData'){
                iconName = focused ? 'ios-timer-outline' : 'ios-timer-sharp';
              } 
              return <Icon name={iconName} size={size}  color={color}/>;
            },
        })}

          tabBarOptions={{ // 활성화 되면 검정색 비 활성화 되면 검정색
          activeTintColor: '#90ee90',
          inactiveTintColor: 'gray',
 
        }} 
      >
        <MainStack.Screen name = "UserLatestSwing" component ={UserLatestSwingScreen} options={{ title: "최근 분석" }} />
        <MainStack.Screen 
          name = "Camera" 
          component ={CameraScreen}
          options={{
            title: "",
            tabBarIcon: ({color, size, focused}) => (
              <CameraButton />
            )
            , tabBarVisible:false 
          }}
        />
       
        <MainStack.Screen name = "UserSwingData" component ={UserSwingDataScreen} options={{ title: "기록"}}  />
      </MainStack.Navigator>
    </CameraButtonContext.Provider>  
  );
};

export default MainNavigator;


const styles =  StyleSheet.create({
  contaier:{
    flex:1,
    alignItems:'center'
  }
})