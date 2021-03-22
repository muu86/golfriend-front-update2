import React, { useState, useEffect, useRef } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    StatusBar, 
    Button,
    Alert,
} from 'react-native';

import { Camera } from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import { Audio } from 'expo-av';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RecordVideo = ({ setIsRecordMode }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasAudioPermission, setHasAudioPermission ] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraReady , setCameraReady] = useState(false);

    const camera = useRef();

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasCameraPermission(status === 'granted');
        })();
    }, []);
      
      useEffect(()=>{
        (async()=>{
          const { status } = await Audio.requestPermissionsAsync();
          setHasAudioPermission(status === 'granted');
        })();
    }, []);
    
    
    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    

    if (hasAudioPermission === null){
        return <View />;
    } 
    if (hasAudioPermission === false){
        return <Text>No access to Audio</Text>;
    }

    const record = async () => {
        if (cameraReady) {
            let video = await camera.current.recordAsync();
            console.log('녹화 완료', video);
        }
    }

    const stopRecord = async () => {
        await camera.current.stopRecording();
    }
    
    return (
        <View style={styles.container}>
            <StatusBar hidden = {true }/>       
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
                <View style ={styles.headerButton} >
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>
                            정면 뷰
                        </Text>
                    </TouchableOpacity>
                </View>
    
                <View style ={styles.headerButton} >
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>
                            아이언
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> 
       
            <Camera 
                style={styles.camera} 
                type= { type }
                ref={camera}
                onCameraReady={() => setCameraReady(true)}
            >

            <View style={styles.buttonBox}>
                {/* 갤러리에서 선택 버튼 */}
                <View style={{ flex:0.5, marginLeft:20, marginTop:41}}>
                    {/* 버튼 누르면 state 변경 => 이미지 피커 */}
                    <TouchableOpacity onPress={() => setIsRecordMode(false)}>
                        <FontAwesome5 name ='photo-video' size ={58} color ={'#FFF'}/>
                    </TouchableOpacity>
                    {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                </View>
    
               {/* 녹화 버튼 */}
                <View style={styles.buttonWidth}>
                    <TouchableOpacity
                        onPress = {record}
                    >         
                        
                        <Animated.View style ={styles.button}>
                                    
                        </Animated.View>    
                        
                    </TouchableOpacity>
                </View>

                {/* 카메라 토글 */}
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );}}>
                    <FontAwesome name = 'repeat' size={45} style={{color:"#FFF"}} />
                </TouchableOpacity>
            </View>
            
            
          </Camera>
        </View>
    )
}

export default RecordVideo;

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        backgroundColor:"#000"
    },
    camera: {
      width:"96%",
      height:"92%",
      marginBottom:9,
      justifyContent:'flex-end',
     
    },
    buttonBox:{
        flexDirection:'row',
        color:"#FFF",
        width:"100%",
        height:150,
        justifyContent:'center'

    },
    button1: {
      flex:0.5,
      alignItems: 'center',
      marginTop:58,
      marginRight:-25
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    headerButton:{
        width:67,
        height:40,
        borderWidth:0.7,
        backgroundColor:"#FFFFFF",
        marginTop:7,
        marginBottom:7,
        marginLeft:12,
        borderRadius:25,
        justifyContent:'center',
        borderColor:"#73E681",
       
        
    },
    buttonText:{
        textAlign:'center',
        color:"#73E681"
    },
    button:{
        backgroundColor:"#FF0000",
        alignItems:"center",
        justifyContent:"center",
        width: 80,
        height: 80,
        borderRadius: 50,
        shadowColor:"#4169e1",
        shadowOffset:{ height:10 },
        shadowOpacity: 0.3,
        borderColor:"#FFF",
        shadowRadius:10,
        
    },
    buttonWidth:{
        alignItems:"center",
        justifyContent:"center",
        width: 90,
        height: 90,
        borderRadius: 50,
        top:-55,
        borderColor:"#FFF",
        shadowRadius:10,
        borderWidth:2.5,
        position:'absolute',
      
    },

    button2:{
        backgroundColor:"#FF0000",
        alignItems:"center",
        justifyContent:"center",
        width: 40,
        height: 40,
        borderRadius: 8,
        shadowColor:"#4169e1",
        shadowOffset:{ height:10 },
        shadowOpacity: 0.3,
        borderColor:"#FFF",
        shadowRadius:10,
    }

  });