import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import AuthContext from './Context/AuthContext';
import MainNavigator from './Screens/MainNavigator';
import SignInNavigator from './Screens/SignInNavigator';
import SplashScreen from './Screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';

const SERVER_IP = "121.138.83.4";

// 토큰 관리할 리듀서
const tokenReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
}

export default function App() {
  // 로고
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      setTimeout(() => setIsLoading(false), 2000);
    })();
  }, []);

  // 토큰 리듀서 state
  const [state, dispatch] = React.useReducer(tokenReducer, {
    isSignout: true,
    userToken: null,
  })
  
  // 시작 시 토큰 확인
  // const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    (async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log(e);
      }

      if (!userToken) { console.log('Token이 없어요'); }
      console.log(userToken);

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    })();
  }, []);

  // 컨텍스트로 관리할 함수
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const result = await axios.post(`http://${SERVER_IP}:80/login`, {
          email: data.email,
          password: data.password,
        })
        .catch(e => console.log(e));
        
        console.log(result);
        await SecureStore.setItemAsync('userToken', result.data);
        dispatch({ type: 'SIGN_IN', token: result.data });
        console.log('토큰이 저장되었습니다.');

      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        const result = await axios.post(`http://${SERVER_IP}:80/signup`, {
          email: data.email,
          lastname : data.lastname,
          firstname: data.firstname,
          password: data.password,
        })
        .catch(e => console.log(e));
        
        console.log(result);
        await SecureStore.setItemAsync('userToken', result.data);
        dispatch({ type: 'SIGN_IN', token: result.data });
        console.log('토큰이 저장되었습니다.');
      },
      getJWT: async () => {
        const result = await SecureStore.getItemAsync('userToken');
        return result;
      },
      // checkIdentity: async () => {
      //   const email = 
      // }
    })
  );

  // 로고 스크린 띄우기
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>    
        {state.userToken == null ? (
          <SignInNavigator />
          ) : (
          <MainNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
