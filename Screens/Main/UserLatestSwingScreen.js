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
    SafeAreaView 
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import AuthContext from '../../Context/AuthContext';

const SERVER_IP = "121.138.83.4";

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

const UserLatestSwingScreen = ({ navigation }) => {
    // const { width, height } = Dimensions.get('window');

    const [modalVisible, setModalVisible] = useState(false);

    const { getJWT } = useContext(AuthContext);
    const [data, setData] = useState(null);

    // 데이터 가져오는 useEffect
    useEffect(() => {
        
        (async () => {
            const userToken = await getJWT();
            await axios.get(`http://${SERVER_IP}:80/latest-swing`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            });
        })();
        
        console.log("최근 분석 useEffect 실행");
    });

    return (
        <View style={styles.maincontainer}>
            <StatusBar 
                backgroundColor="#73E681"
                
                // style="light"
            />


            <View 
                style ={{ 
                    flex: 0.1, 
                    flexDirection:"row", 
                    justifyContent:"space-around", 
                    alignItems: 'center',
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
                    <Image
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
                    />
                {/* </View> */}
                {/* 문구 */}
                <Text 
                    style={{
                        fontSize:25,
                        fontWeight:'bold',
                        // marginHorizontal:31,
                        // marginTop:30,
                        textAlign:"left"
                    }}
                >
                    {data}님 환영합니다!
                </Text>
                {/* 프로필 버튼 */}
                <TouchableOpacity
                    style={{
                        flex: 0.1,
                    }}
                    onPress={() => { setModalVisible(true) }}
                >
                    <FontAwesome 
                        name={'user'}
                        size={30}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <ProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </View>

            <ScrollView style={styles.container}>
                <Text style ={styles.Text}>
                    Awards
                </Text>

                <ScrollView // Awards View
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalSCroll}
                >
                    {/* <Awardsbox />
                    <Awardsbox />
                    <Awardsbox />
                    <Awardsbox />
                    <Awardsbox />
                    <Awardsbox /> */}
                </ScrollView>

                <Text style ={ styles.PerfectText}>
                    당신의 Pro Shot
                </Text>

                <ScrollView //  당신의 perfect View
                    horizontal
                    showsHorizontalScrollIndicator ={false}
                    style={styles.horizontalSCroll2}
                >
                    {/* <PerfectButton />
                    <PerfectButton />
                    <PerfectButton />
                    <PerfectButton />
                    <PerfectButton />
                    <PerfectButton />
                    <PerfectButton /> */}
                </ScrollView>

                <Text style ={ styles.Text}>
                    개선사항
                </Text>

                {/* <ImproveButton />
                <ImproveButton />
                <ImproveButton /> */}
            </ScrollView>
        </View>
    )
};

export default UserLatestSwingScreen;

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
        marginHorizontal:31,
        marginTop:30,
        textAlign:"left"
    }, 
    PerfectText :{
        fontSize:22,
        fontWeight:'bold',
        marginHorizontal:32,
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