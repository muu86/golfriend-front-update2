import React, { useState, useEffect, PureComponent, useRef } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    StatusBar,
    Dimensions,
    Button,
    Alert,
    Modal,
} from 'react-native';
import { Camera } from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
// import * as MediaLibrary from 'expo-media-library';

const RecordScreen = ({ navigation }) => {

    const WIDTH = Dimensions.get('window').width; 

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraReady , setCameraReady] = useState(false);
    // const [modalVisible, setModalVisible] = useState(false);

    const [audioPermission, setHasAudioPermission ] = useState(null);
    const [recording, setRecording] = useState(false);
    const [modalup, setModalup] = useState(false);
    // const [ uri, setUri] = useState(null);
    const camera = React.useRef();

    // 동영상&오디오&카메라저장 권한 승인
    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);
  
    useEffect(()=>{
        (async()=>{
        const { status } = await Audio.requestPermissionsAsync();
        setHasAudioPermission(status === 'granted');
        })();
    }, []);

    // 갤러리 권한
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []); 
 
    const record = async () => {
        const options ={
            maxDuration: 8,
            quality:'4:3',
        }

        if(cameraReady) {
            setRecording(true);
            console.log('Start Recording Video')
            const result = await camera.current.recordAsync(options);
            console.log(result.uri)
            navigation.navigate('Video', {
                uri: result.uri,
            })
        }
    };

    const stopRecord = async () =>{
        setRecording(false);
        await camera.current.stopRecording();
        // setModalVisible(true);
    };

    // const pickVideo = () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    //     });

    //     console.log(result.uri);
    //     if (!result.cancelled) {
    //         setVideoUri(result.uri);
    //         navigation.navigate('Video', {
    //             uri: result.uri,
    //         })
    //     }
    // }

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
        //   setImage(result.uri);
          navigation.navigate('Video', {
              uri: result.uri,
          });
        }
    };

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  

    if(audioPermission === null){
      return <View />;
    } 
    if (audioPermission === false){
      return <Text>No access to Audio</Text>;
    }

    return(    
    <View style={styles.container}>
    <StatusBar hidden = {true }/>       
        <View 
            style={{ 
                flexDirection:'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: 20,    
            }}
        >
            {/* 정면 뷰, 측면 뷰 버튼 */}
            <View style={{ flex: 3, justifyContent: 'flex-start', flexDirection: 'row', }}>
                <View style ={styles.headerButton}>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>
                            정면
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style ={styles.headerButton} >
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>
                            측면
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* 뒤로가기 */}
            <TouchableOpacity 
                style={{ flex: 0.5, justifyContent: 'flex-end' }}
                onPress={() => navigation.navigate('UserLatestSwing')}
            >
                <Icon name="close-outline" size={55} color="black" />
            </TouchableOpacity>
        </View> 
       {/* 카메라 동여상 촬영 종료시 작동되는 모달 페이지 시작점*/}
       {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=> {setModalVisible(!modalVisible);}}>
        <View style={styles.modalView}>
            <View style={{width:"100%", flexDirection:'row' ,justifyContent:'flex-end',flex:1}}>
              <TouchableOpacity  onPress={()=> setModalVisible(!modalVisible)}>
                <Icon name = 'arrow-back-outline' size ={30} color="#FFF"  />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.5}}>
              <View style ={styles.ModalheaderButton} >
                      <Icon name ='analytics-outline' size ={30} color ={'#73E681'} />
                      <TouchableOpacity onPress={()=>{
                        uploadingVideo(); 
                        setModalVisible(!modalVisible);
                      }
                      }>
                          <Text style={styles.ModalbuttonText}>
                              분석
                          </Text>
                      </TouchableOpacity>
                </View>
                <View style ={styles.ModalheaderButton} >
                    <Icon name ='refresh-outline' size ={30} color ={'#73E681'} />
                      <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                          <Text style={styles.ModalbuttonText}>
                              재촬영
                          </Text>
                      </TouchableOpacity>
                </View>
              </View>
        </View>
      </Modal> */}
       {/* 카메라 동여상 촬영 종료시 작동되는 모달 페이지 종료*/}  

        <Camera 
            style={styles.camera} 
            ratio='4:3'
            type= { type }
            ref={camera}
            onCameraReady={() => setCameraReady(true)}
        /> 

        {/* 하단 버튼 박스 */}
        <View 
            style={{
                flex: 0.5,
                flexDirection:'row',
                // color:"#FFF",
                // width:"100%",
                // height:150,
                justifyContent:'center',
                alignItems: 'center',
            }}
        >
            {/* 갤러리 선택 버튼 */}
            <View 
                style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <TouchableOpacity onPress={pickVideo}>
                    <FontAwesome5 name ='photo-video' size ={30} color ={'black'}/>
                </TouchableOpacity>
            </View>
        
            {/* 녹화 버튼 */}
            <View  
                style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems:"center",
                    width: WIDTH * 0.25,
                    height: WIDTH * 0.25,
                    // backgroundColor: 'black',
                    borderRadius: WIDTH * 0.2 * 0.5,
                    borderColor: 'black',
                    borderWidth: 5,
                }}
            >
                    <TouchableOpacity
                        onPress = { recording ?  stopRecord : record}>
                    
                        <Animated.View style ={ recording ? styles.startRecordingButton : styles.stopRecordingButton }>
                                    
                        </Animated.View>    
                        
                    </TouchableOpacity>
            </View>
            {/* 카메라 토클 버튼 */}
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );}}>
                <FontAwesome name = 'repeat' size={30} style={{color:"black"}} />
            </TouchableOpacity>
        </View>

    </View>
    );
};

export default RecordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        // backgroundColor:"#000"
    },
    camera: {
    //   width:"96%",
    //   height:"92%",
        flex: 1,
        // position: 'absolute',
        top: 80,
        bottom: 20,
        width: 3 * 130,
        height: 4 * 130,
        marginBottom:9,
        justifyContent:'flex-end',
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
    startRecordingButton:{
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
    },
    stopRecordingButton:{
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
    
    modalView: {
      flex:1,
      backgroundColor: "rgba(0,0,0,0.7)",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flexDirection:'column',
      justifyContent:'center'
    },

    ModalheaderButton:{
      width:150,
      height:60,
      borderWidth:1.2,
      backgroundColor:"#FFFFFF",
      marginTop:10,
      marginBottom:7,
      marginLeft:12,
      borderRadius:50,
      justifyContent:'center',
      borderColor:"#73E681",
      flexDirection:'row',
      alignItems:'center',
  },

  ModalbuttonText:{
    textAlign:'center',
    color:"#73E681",
    fontSize:25,
    fontWeight:'normal',
  },
});