import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
    NativeAppEventEmitter, 
    Share,
    StatusBar, 
    TouchableOpacity, 
    Dimensions, 
    SafeAreaView,
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    KeyboardAvoidingView,  
    Keyboard,
    TextInput,
    FlatList
} from "react-native";
import axios from 'axios';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from 'react-native-vector-icons';
import AuthContext from '../../Context/AuthContext';

const SERVER_IP = "121.138.83.4"; 

const Social = ({ data, token }) => {
    const video = useRef();
    const [ status, setStatus ] = useState({});

    const [comment, onChangeComment] = useState(null);

    const [like, setLike] = useState(false);
    const sendLike = async () => {
        await axios.get(
            `http://${SERVER_IP}:80/like?type=plus&name=${data.videoName}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }    
        )
        .then(res => console.log(res))
        .catch(error)
    }

    const sendCancelLike = async () => {
        await axios.get(`http://${SERVER_IP}:80/like?type=minus&name=${data.videoName}`)
        .then(res => console.log(res))
        .catch(error)
    }

    return (
        <View style={styles.InstaContainer}> 
            <View 
                style={{
                    flexDirection:"row",
                    marginBottom:10,
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
            >
                {/* <View style={styles.userIcon} /> */}
                <Text 
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft:10,
                        // marginTop:10
                    }}
                >
                    {data.userName}
                </Text>
                <Text style={{ fontSize: 10, textAlignVertical: 'bottom' }}>님의 스윙영상</Text>
                <Text>
                    {data.date}
                </Text>
            </View>

                <View style={styles.instaVideoContainer}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: `http://${SERVER_IP}:80/get-social-video?name=${data.videoName}`,
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isMuted
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </View>

                <View style ={styles.iconContainer}> 
                    <TouchableOpacity 
                        onPress={like ? sendLike : sendCancelLike}
                    >
                        <Ionicons 
                            name=
                                { 
                                    like ? 
                                        "heart" 
                                        : 
                                        "heart-outline" 
                                }
                            size={30} 
                            color=
                                {
                                    like ? 
                                        "#ff0000" 
                                        : 
                                        "#000"
                                } 
                            style={{ marginLeft:10, marginTop:5 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        // onPress ={()=> {navigation.navigate('CommentScreen')}}
                    >
                        <Ionicons name="chatbubbles-outline" size={30}style={{marginLeft:10,marginTop:5}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name ="ios-share-social" size ={30}style={{marginLeft:280,marginTop:5}}/>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 22, justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{data.likes}</Text>
                    <Text style={{ marginLeft:10, textAlignVertical: 'bottom' }}> 
                        {/* { like }  */}
                        Likes
                    </Text>
                </View>

                <FlatList 
                    style={styles.ScrollViewBox}
                >
                    {/* {DATA.map((item, index) => ({item[0]}))}  */}
                    
                    {/* <KeyboardAvoidingView> */}
                        <View style ={styles.CommentContainer}>
                            <View style ={{flex:1}}>
                                <TouchableOpacity 
                                    // onPress={Keyboard.dismiss} 
                                    style={{height:"100%"}} 
                                />
                            </View>
                            <View style ={styles.EditorContainer}>
                                <TextInput 
                                    onChangeText={onChangeComment} 
                                    value={comment} 
                                    style={{flex: 1}} 
                                    multiline placeholder={"댓글 달기.."}>
                                </TextInput> 
                                <TouchableOpacity 
                                    style={{width: 50}} 
                                    // onPress={onClick}
                                >
                                    <Text style={{color:"#00bfff" }}>게시</Text>
                                </TouchableOpacity>
                            
                            </View>
                                {/* {commentList} */}
                    
                        </View>

                    {/* </KeyboardAvoidingView>                    */}
                </FlatList>
            </View>
    )
}

const SocialScreen = () =>{
    const [token, setToken] = useState(null);
    const { getJWT } = useContext(AuthContext);
    useEffect(() => {
        (async () => {
            setToken(getJWT());
        })();
    }, []);

    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        (async () => {
            await axios.get(`http://${SERVER_IP}:80/get-social?index=${index}`)
            .then(res => {
                setData(res.data.socialData);
                console.log(data);
            })
            .catch(error => {
                if (error.response) {
                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  }
                  else if (error.request) {
                    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                    // Node.js의 http.ClientRequest 인스턴스입니다.
                    console.log(error.request);
                  }
                  else {
                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            });
        })();
    }, []);

    return(
        <View style={styles.maincontainer}> 
            <StatusBar backgroundColor ={"#FFF"} barStyle={"dark-content"}></StatusBar>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {data && data.map((item, index) => (
                    <Social key={index} data={item} token={token} />
                ))}
            </ScrollView>
        </View>
    );
};
export default SocialScreen;


const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:"white",
        flexDirection:"column",

    },
    container:{
        flex:1,
        backgroundColor:'#FFF',
        marginTop:30
    },
    Text :{
        fontSize:25,
        fontWeight:'bold',
        marginHorizontal:31,
        marginTop:30,
        textAlign:"left"
    }, 
    firstScrollContainer:{
        height:100,
        width:"100%"
    },
    video: {
        alignSelf: 'center',
        width: "100%",
        height: "100%",
    },
    InstaContainer:{
        width:"100%",
        height:650,
        marginTop:15,
        borderBottomWidth:1,
        marginBottom:30
    },
    instaVideoContainer:{
        width:"100%",
        height:380,
        marginTop:10,
        backgroundColor:"rgba(56, 56, 56, 0.13)"
    },
    iconContainer:{
        flexDirection:"row",
        marginTop:15
    },
    userIcon:{
        height:50,
        width:50,
        borderRadius:100,
        borderWidth:1,
        marginLeft:20
    },
    ScrollViewBox:{
        width:"90%",
        marginTop:10
    },

    EditorContainer:{
        padding:5,
        minHeight:65,
        borderTopColor:"#a9a9a9",
        borderTopWidth:0.25,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:"#FFF"
    },
    AvatarImage:{
        height:30,
        width:30,
        borderRadius:15,
        marginTop:10,
        marginLeft:10,
        padding:10,
        borderWidth:1

    },
    commentContainer:{
        flex:1
    }
});