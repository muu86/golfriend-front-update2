import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    Button, 
    NativeAppEventEmitter, 
    // StatusBar, 
    TouchableOpacity, 
    Dimensions, 
    SafeAreaView,
    Alert,
} from "react-native";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons, FontAwesome, AntDesign, Feather } from 'react-native-vector-icons';
import axios from 'axios';

import AuthContext from '../../Context/AuthContext';
import Awards from '../../Components/UserSwingData/Awards';
import ProShotAndImprovement from '../../Components/UserSwingData/ProShotAndImprovement';
import PastFeedback from '../../Components/UserSwingData/PastFeedBack';

import { SERVER_IP } from '../../constants';

const ProfileModal = ({ modalVisible, setModalVisible }) => {
    const { signOut } = useContext(AuthContext);

    return (
        <View
            style={{ 
                position: 'absolute',
                top: 20,
                width: 300,
                height: 300,
                margin: 0,
            }} 
        >
        <Modal
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}        
        >
            <View 
                style={{ 
                    position: 'absolute',
                    top: 20,
                    width: 300,
                    height: 300,
                    margin: 0,
                }}
            >
                <Text>프로필</Text>
                <TouchableOpacity
                    style={{ flex: 1, }}
                    onPress={signOut}
                >
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        </View>
    );
};

const UserSwingDataScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const { signOut, getJWT } = useContext(AuthContext);

    const [token, setToken] = useState(null);
    const [data, setData] = useState([]);
    // 몽고디비 배열 데이터에서 몇 번째 스윙 데이터를 가져오는지 정하는 index
    const [index, setIndex] = useState(0);
    useEffect(() => {
        console.log('--------------------')
        let userToken = getJWT();
        setToken(userToken);
        console.log("token useEffect!!!")
        console.log(token);
        setData([]);
        setIndex(0);
    }, [isFocused]);

    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        (async () => {
            console.log('badges 가져오기');
            console.log(token);
            await axios.get(`http://${SERVER_IP}:80/get-user-info`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log('badges 가져오기 성공!')
                setUserInfo(res.data);
                // console.log(badges);
                console.log('userInfo', userInfo);
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
    }, [token, isFocused])


    // React.useLayoutEffect(() => {
    //     setData([]);
    //     setIndex(0);
    // }, [isFocused])
    // 데이터 가져오는 useEffect
    // useFocusEffect(
    //     React.useCallback(() => {
    //         return () => {
    //             console.log('focusEffect')
    //             setData([]);
    //             setIndex(0);
    //         }
    //     })
    // )
    useEffect(() => {
        
        (async () => {
            // const userToken = await getJWT();
            // setToken(userToken);
            // await axios.get(`http://${SERVER_IP}:80/past-swing`, {
            //     headers: {
            //         Authorization: `Bearer ${userToken}`
            //     }
            // })
            await axios.get(`http://${SERVER_IP}:80/get-past-swing?index=${String(index)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                // console.log(res);
                console.log('----------swingData----------------');
                // console.log(data);
                if (res.data === "no more data") {
                    // Alert.alert('데이터가 없습니다.');
                    if (index >= 1) {
                        setIndex(index - 1);
                    }
                    return;
                }
                console.log(res.data.filePath);
                // console.log(data[0].filePath);
                if (res.data.filePath === ( data[-1] && data[-1].filePath )) {
                    console.log('----------pass------------')
                    return;
                }
                setData([res.data].concat(data));
                // console.log(data);
            })
            // 토큰 유효기간이 지나 401 에러뜨면 자동 로그 아웃
            .catch(async error => {
                console.log(error);
                if (error.response.status === 401) {
                    await signOut();
                }
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
        console.log("최근 분석 useEffect 실행");
        // 데이터를 가져왔으면 index를 1씩 증가시켜줌
    }, [index, token, isFocused]);

    // // 서버에서 가져온 데이터 확인용 Effect
    // useEffect(() => {
    //     if (data) {
    //         console.log(typeof data.swingData);
    //     }
    // }, [data]);

    return (
        <View style={styles.maincontainer}>
            <StatusBar 
                backgroundColor="#73E681"
                
                // style="light"
            />

            

            <ScrollView style={styles.container}>
                <View 
                    style ={{ 
                        flex: 0.4, 
                        flexDirection:"row", 
                        justifyContent:"space-between", 
                        alignItems: 'center',
                        marginVertical: 30,
                        // backgroundColor: 'gray' 
                    }}
                >
                    {/* 로고 */}
                    {/* <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'blue',
                        }}
                    > */}
                        {/* <Image
                            source={require('../../assets/GolfriendFlag.png')} 
                            // resizeMode='center'
                            style={{
                                flex: 0.15,
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',

                                // maxWidth: '40%',
                                // marginLeft:24, 
                                // marginTop:45,
                                // alignSelf: 'center',
                                // alignContent: 'center',
                                // resizeMode: 'contain',
                                // backgroundColor: 'blue',
                            }}
                        /> */}
                    {/* </View> */}
                    {/* 문구 */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, }}>
                        <Text 
                            style={{
                                fontSize:25,
                                fontWeight:'bold',
                                // marginHorizontal:31,
                                // marginTop:30,
                                textAlign: "center"
                            }}
                        >
                            {userInfo ? userInfo.userName : "Test"}
                        </Text>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'bottom'}}> 님 환영합니다!</Text>
                    </View>
                    {/* 프로필 버튼 */}
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            marginLeft:-100
                        }}
                        onPress={() => {navigation.navigate('Profile', { userName: userInfo.userName })}}
                    >
                        <FontAwesome
                            name={'user'}
                            size={30}
                            color={'#000'}
                            
                        />
                    </TouchableOpacity>
                    <ProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </View>

                {/* Awards */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginVertical: 20, }}>
                    <Ionicons name="medal-outline" size={20} color="black" />
                    <Text style ={styles.Text}>
                        뱃지
                    </Text>
                </View>

                {userInfo && token && <Awards token={token} badges={userInfo.badges} />}
                
                {/* 데이터를 받으면 개선 사항 뿌려줌 */}
                {/* {data && <ProShotAndImprovement data={data.swingData} token={token} />} */}
                {data[0] && isFocused ? 
                    data.map((item, index) => (
                        <ProShotAndImprovement key={index} data={item} token={token} />
                    )) : (
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <Text>스윙을 분석하고 내 데이터를 기록해보세요.</Text>
                        </View>
                    )
                }
                

            </ScrollView>
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
        </View>
    )
};

export default UserSwingDataScreen;

const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        paddingTop: 30,
        backgroundColor:"white",
        flexDirection:"column",
    },
    container:{
        flex:1,
        backgroundColor:'#FFF', 
    },
    headerView:{
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        width:"100%",
        height:100,
        backgroundColor:"#0F152C",
    },
    Text :{
        fontSize:25,
        fontWeight:'bold',
        marginHorizontal: 10,
        // marginTop:30,
        textAlign:"left"
    }, 
    headerText:{
        color:'#FFF',
        textAlign:"left",
        fontSize:14,
        fontWeight:"bold",
        marginTop:52,
        marginHorizontal:31  
    },
    headline: {
        alignSelf: "center",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 30
    },
    videoTile: {
        alignSelf: "center",
        fontSize: 16,
        marginTop: 15
    },
    backgroundVideo: {
        width:"90%",
        height:450,
        paddingTop:80,
    },
    horizontalSCroll1:{
        height:220,
        width:"100%",
        marginLeft:32,
        marginVertical:22,
        backgroundColor:'black',
    },
    horizontalSCroll2:{
        height:175,
        width:"100%",
        marginHorizontal:20,
        marginTop:30,
    },
});