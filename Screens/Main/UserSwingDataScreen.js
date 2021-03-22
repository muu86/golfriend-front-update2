import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import  { View, StyleSheet, Text } from "react-native";


const UserSwingDataScreen = () =>{

    return(
        <View styles={styles.container}>
            <Text style = {styles.Text}>기록</Text>
        </View>
    );
};
export default UserSwingDataScreen;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "black",
        alignItems:"center",
        justifyContent: "center",
        
    },
    Text :{
        fontSize:20,
        color: 'red',
        fontWeight: 'bold',
        textAlign:"center",
        
    }
});