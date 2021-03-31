import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
    StatusBar, 
    TouchableOpacity, 
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    KeyboardAvoidingView,  
    TextInput,
    Alert
} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import AuthContext from '../../Context/AuthContext';

import { SERVER_IP, DATE_FORMAT } from '../../constants';

const Social = ({ data, token, refresh, setRefresh }) => {
    const video = useRef();
    const [ status, setStatus ] = useState({});

    // 날짜 데이터 포맷
    const dateList = data.date.split('-').map((item, index) => (
        data.date.split('-')[index] + DATE_FORMAT[index]
    ));

    const [comment, onChangeComment] = useState('');
    // useEffect(() => console.log(comment), [comment]);

    const [comments, setComments] = useState(null);
    // console.log('console.log data')
    // console.log(data);
    useEffect(() => { 
        setComments(data.comments);
    });
    
    // console.log(data.likes);

    const [like, setLike] = useState(false);
    useEffect(() => {
        (async () => {
            await axios.get(
                `http://${SERVER_IP}:80/get-social-video-likes`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                )
                .then(res => {
                    if (res.data.likes.includes(data.videoName)) {
                        setLike(true);
                    }
                })
            })();
        }, [like]);
    
    const [likesCounts, setLikesCounts] = useState(data.likes.length);
    // useEffect(() => {
    //     (async () => {
    //         await axios.get(
    //             `http://${SERVER_IP}:80/get-social-video-likes`,
    //         )
    //     })
    //     .then(res => setLikesCounts(res.data));
    // })
        
    const sendLike = async () => {
        await axios.get(
            `http://${SERVER_IP}:80/update-like?type=plus&name=${data.videoName}`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }    
        )
        .then(res => {
            setLikesCounts(res.data.counts);
            // console.log(likeCounts);
        })
        .catch(error => console.log(error));

        setLike(true);
    }

    const sendCancelLike = async () => {
        await axios.get(
            `http://${SERVER_IP}:80/update-like?type=minus&name=${data.videoName}`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        .then(res => {
            setLikesCounts(res.data.counts);
        })
        .catch(error => {
            console.log(error)
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

        setLike(false);
    }

    const sendComment = async () => {
        // if (String(comment).length === 0) {
        //     Alert.alert('하나 이상의 글자를 입력해주세요.');
        //     onChangeComment(null);
        //     return;
        // }
        await axios.post(
            `http://${SERVER_IP}:80/post-comment`,
            { 
                "comment": comment,
                "videoName": data.videoName,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
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
        })

        setRefresh(!refresh);
        onChangeComment(null);
    }

    return (
        <View style={styles.InstaContainer}> 
            <View 
                style={{
                    flexDirection:"row",
                    marginBottom:10,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <View 
                    style={{ 
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginHorizontal: 10,
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
                        {data.email}
                    </Text>
                    {/* <Text style={{ fontSize: 10, textAlignVertical: 'bottom' }}>님의 스윙영상</Text> */}
                </View>
                <Text style={{ marginHorizontal: 10, alignSelf: 'flex-end' }}>
                    {dateList}
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
                    {/* 좋아요 버튼 */}
                    <TouchableOpacity 
                        onPress={!like ? sendLike : sendCancelLike}
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
                    {/* 코멘트 버튼 */}
                    <TouchableOpacity 
                        // onPress ={()=> {navigation.navigate('CommentScreen')}}
                    >
                        <Ionicons name="chatbubbles-outline" size={30}style={{marginLeft:10,marginTop:5}}/>
                    </TouchableOpacity>
                    {/* 공유 버튼 */}
                    <TouchableOpacity>
                        <Ionicons name ="ios-share-social" size ={30}style={{marginLeft:280,marginTop:5}}/>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 15, justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{likesCounts}</Text>
                    {/* <Text>{likesCounts}</Text> */}
                    <Text style={{ marginLeft:10, textAlignVertical: 'bottom', fontSize: 16, fontWeight: 'bold' }}> 
                        {/* { like }  */}
                        Likes
                    </Text>
                </View>
                {data.comments.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', marginHorizontal: 20 }}>{item.email}</Text>
                        <Text>{item.comment}</Text>
                    </View>
                ))}
                <KeyboardAvoidingView>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        <TextInput
                            style={{ marginLeft: 20, flex: 1, height: 50}}
                            value={comment}
                            onChangeText={onChangeComment}
                            multiline
                            placeholder={"코멘트 남기기~"}
                        >

                        </TextInput>
                        <TouchableOpacity 
                            style={{ marginHorizontal: 20 }}
                            onPress={sendComment}
                        >
                            <FontAwesome name="send-o" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {/* <FlatList 
                    style={styles.ScrollViewBox}
                >
                    {/* {DATA.map((item, index) => ({item[0]}))}  */}
                    
                    {/* <KeyboardAvoidingView> */}
                        {/* <View style ={styles.CommentContainer}>
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
                                {commentList}
                    
                        </View> */}

                    {/* </KeyboardAvoidingView>                    */}
                {/* </FlatList> */}
            </View>
    )
}

const SocialScreen = ({ navigation }) =>{
    const [token, setToken] = useState(null);
    const { getJWT } = useContext(AuthContext);
    useEffect(() => {
        setToken(getJWT());
    }, []);

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    // Social 컴포넌트에게 넘겨줘서 SocialScreen 업데이트 하게 만든다.
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        (async () => {
            await axios.get(`http://${SERVER_IP}:80/get-social?index=${index}`)
            .then(res => {
                console.log('--------------------------');
                if (res.data === "no more data") {
                    // Alert.alert('데이터가 없습니다.');
                    if (index >= 1) {
                        setIndex(index - 1);
                    }
                    return;
                }
                console.log(res.data.socialData);
                setData(res.data.socialData.concat(data));
                // console.log(data);
                console.log('-----------data--------------')
                console.log(data);
            })
            .catch(error => {
                console.log('===========error===============');
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
    }, [refresh, isFocused, index]);

    return(
        <View style={styles.maincontainer}> 
            <StatusBar backgroundColor ={"#FFF"} barStyle={"dark-content"}></StatusBar>
            <View style ={{flexDirection:"row",marginTop:20}}>
                <Text style={styles.Text}>Golfriend</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons style={{marginLeft:200, marginTop:43}} name = 'arrow-back' size ={25} color ={'#000'} />
                </TouchableOpacity>
            </View>         
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {data[0] && data.map((item, index) => (
                    <Social key={index} data={item} token={token} refresh={refresh} setRefresh={setRefresh} />
                ))}

                {/* 더 불러오기 버튼 */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent:'space-around', height: 30, backgroundColor: 'gainsboro', alignItems: 'center'}}
                    onPress={() => {
                        setIndex(index + 1)
                        console.log(index);
                    }}
                >   
                    <Text>더 불러오기</Text>
                    <Feather name="arrow-down" size={15} color="white" />
                    <Feather name="arrow-down" size={15} color="white" />
                </TouchableOpacity>
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
        // height:650,
        marginTop: 20,
        borderBottomWidth:1,
        marginBottom: 30,
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