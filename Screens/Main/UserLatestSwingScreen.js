import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Button, 
    NativeAppEventEmitter, 
    StatusBar, 
    TouchableOpacity, 
    Dimensions, 
    SafeAreaView 
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import AuthContext from '../../Context/AuthContext';

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
    // useEffect(() => {
    //     const token = getJWT();
        
    //     (async () => {
    //         await axios.get('http://121.138.83.4:80/latest-swing', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         .then(res => {
    //             console.log(res.data);
    //             setData(res.data);
    //         });
    //     })();
    // }, []);

    return (
        <View style={styles.maincontainer}>
            <StatusBar backgroundColor ={"#FFF"} barStyle={"dark-content"}></StatusBar>
            <View style ={{ flexDirection:"row", justifyContent:"space-between" }}>
                <Text style={styles.Text}>{data}님 환영합니다!</Text>
                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                    <FontAwesome 
                        style={{ marginRight:31, marginTop:43 }}
                        name={'user'}
                        size={20}
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