import react from 'react';
import React from 'react';
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { POSE_NAME } from '../../constants';

const { width, height } = Dimensions.get('window');

export default class PerfectButton extends React.Component{
    render(){
        const { data } = this.props;
        return(
            <View style={{
                // position:'relative'
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Animated.View style ={styles.button}>
                    <Text style ={styles.Text}>
                        {POSE_NAME[data].charAt(0).toUpperCase()}
                    </Text>
                </Animated.View>
                <View style ={{width:80, height:54}}>
                    <Text 
                    style={{
                        marginLeft:7, 
                        marginTop:8,
                        textAlign:"center",
                        fontSize: 13,
                        color:"#0066FF",
                        fontWeight:'bold'}}>

                        {POSE_NAME[data]}
                    </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button:{
        backgroundColor:"#0066FF",
        alignItems:"center",
        justifyContent:"center",
        width: width / 8,
        height: width / 8,
        borderRadius: 100,
        // shadowOffset:{height:10},
        borderWidth:9,
        borderColor:'#DAE9FF',
        // marginLeft:10,
    },
    
    Text:{
        fontSize:30,
        color: "#FFF",
        fontWeight:"bold",
        textAlign:'left',
        marginBottom:2
    }
});