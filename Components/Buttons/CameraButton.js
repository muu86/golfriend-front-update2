import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
// import {   } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

// export default class CameraButton extends React.Component {

//     constructor(props) {
//         super(props)
//         this.buttonsize = new Animated.Value(1)
//     }


//     ButtonAnimation = () => {
//             Animated.timing(this.buttonsize, {
//                 toValue:0,
//                 duration:200,
//                 useNativeDriver:false
//             }).start();
        
//     };

//         render(){

//             const { navigation } = this.props;
           
//             const sizeStyle =    this.buttonSize;
             
            

//         return(
            
//             <View style={{ position:'absolute', alignItems:"center" }} >
                
//                 <Animated.View style ={[styles.button, { transform: }]}>
//                     <TouchableOpacity onPress={this.ButtonAnimation}>
//                         <Animated.View> 
//                             <Icon name ='camera' size={65} color='#FFF'/>
//                         </Animated.View>   
//                     </TouchableOpacity>
//                 </Animated.View>
//             </View>
//         );
//     }
// }

const CameraButton = () => {
    return (
        <View style={{ position:'absolute', alignItems:"center" }}>
            <View style ={[styles.button,]}>
                {/* <TouchableOpacity onPress={}> */}
                    <View> 
                        <Icon name ='camera' size={65} color='#FFF'/>
                    </View>   
                {/* </TouchableOpacity> */}
            </View>
        </View>                       
    )
}

export default CameraButton;

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#4169e1",
        alignItems:"center",
        justifyContent:"center",
        width: 78,
        height: 78,
        borderRadius: 40,
        position:'absolute',
        top:-55,
        shadowColor:"#4169e1",
        shadowOffset:{ height:10 },
        shadowOpacity: 0.3,
        borderColor:"#FFF",
        shadowRadius:10,
        borderWidth:1.5,
        marginLeft:100
    }
});