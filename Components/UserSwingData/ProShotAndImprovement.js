import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useRef } from 'react';
import { 
    Animated, 
    Button, 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Transition, TransitioningView } from 'react-native-reanimated';

import {Ionicons, MaterialIcons, FontAwesome} from 'react-native-vector-icons';

import PerfectButton from './PerfectButton';
import { SERVER_IP, POSE_NAME } from '../../constants';

const Improvement = ({ data, index, imagePath, token }) => {
    // constructor (){
    //     super();
    //     this.state={
    //         animationValue :  new Animated.Value(100),
    //         viewState : true,
    //         // textCounts: ,
    //     }
    // }
    const animationValue = useRef(new Animated.Value(100)).current;
    const [viewState, setViewState] = useState(true);
    
    // toggleAnimation =() =>{
        
    //     if(this.state.viewState ==  true ){
    //         Animated.timing(this.state.animationValue,{
    //             toValue: 100 + (this.state.textCounts * 50),
    //             timing: 300,
    //             useNativeDriver:false
    //         }).start(()=>{
    //             this.setState({viewState : false })
    //         });
    //     }
    //     else{
    //         Animated.timing(this.state.animationValue, {
    //           toValue : 100,
    //           timing : 300,
    //           useNativeDriver: false,
    //         }).start(this.setState({viewState: true})
    //         );
    //       }
    // }
    console.log(data)
    console.log(index)
    const detailFeedback = Object.keys(data[index])
        .filter((item, idx) => (
            data[index][item]["0"] <= 1
        ))
        .map((item, idx) => (
            data[index][item]["2"]
        ))
    const textCounts = detailFeedback.length;

    const toggleAnimation = () => {
        if(viewState ==  true ){
            Animated.timing(animationValue, {
                toValue: 100 + (textCounts * 70),
                timing: 50,
                useNativeDriver:false
            }).start(()=>{
                setViewState(false);
            });
        }
        else{
            Animated.timing(animationValue, {
              toValue : 100,
              timing : 50,
              useNativeDriver: false,
            }).start(() => setViewState(true))
          }
    }

    const animatedStyle ={
        height :  animationValue,
    }

    return (
        <View style = {styles.container}>
            
                
                <Animated.View style ={[styles.Awardsbox, animatedStyle]}>
    
                    {/* <View style={styles.Imagebox}> */}
                    <View style={{ 
                        flex: 1, 
                        // backgroundColor: 'red' 
                    }}>
                    {/* 버튼 누르기 전 row 로 정렬된 View */}
                        <View 
                            style={{ 
                                flex: 1, 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                // backgroundColor: 'blue',
                            }}
                        >
                            <View style={{  
                                // backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}>
                                <Image
                                    style={{ 
                                        flex: 1,
                                        resizeMode: 'cover',
                                        width:70,
                                        maxHeight:100,
                                        borderRadius:20,
                                        backgroundColor:"#FFF",
                                        position:'relative',
                                        // marginLeft:10,
                                        // marginTop:10,
                                        shadowColor:"#000",
                                        shadowOffset:{
                                            width:0,
                                            height:2,
                                        },
                                    }}
                                    source={{
                                        uri: `http://${SERVER_IP}:80/get-image/${String(imagePath)}_${String(index)}`,
                                        headers: {
                                            'Authorization': `Bearer ${token}`,
                                        },
                                    }}
                                />
                            </View>

                        {/* </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 0.7}}>
                            <View style={{ 
                                flexDirection: 'column', 
                                // alignItems: 'center' 
                                }}
                            >
                                
                                    <Text style ={{
                                        fontSize: 25,
                                        textAlign: 'left'
                                        // fontWeight:"bold",
                                        // marginVertical:10,
                                        // marginHorizontal:100,
                                        // position:"absolute"
                                    }}> 
                                        {POSE_NAME[index].charAt(0).toUpperCase() + POSE_NAME[index].slice(1)}
                                    </Text>
                                    {/* <Text>
                                        김민제
                                    </Text> */}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={toggleAnimation}>
                            <FontAwesome name ={viewState ? 'chevron-right' : 'chevron-down'} size ={16} style={styles.IconStyle} color ={'#90ee90'} />   
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress ={this.toggleAnimation}>
                            <FontAwesome name= 'right' size={50} style={styles.IconStyle} />
                        </TouchableOpacity>   */}
                        </View>
                        {!viewState && (
                            detailFeedback
                                .map((item, idx) => (
                                    <View 
                                        key={item}
                                        style={{
                                            // alignItems: 'center',
                                            width: '80%',
                                            alignSelf: 'center'
                                        }}
                                    >   
                                        <View
                                            style={{ flexDirection: 'row' }}
                                        >
                                            <Ionicons name="close-circle" size={32} color="#FF0000" />
                                            <Text style={{ marginVertical: 10 }}>{item}</Text>
                                        </View>
                                    </View>
                                ))
                        )}
                    </View>
                </Animated.View>
                    
                
        </View>
    );
}

const ProShotAndImprovement = ({ data, token }) => {
    const imagePath = data["filePath"];
    
    const poseAverage = Object.keys(data)
        .filter((item, idex) => {
            return !isNaN(Number(item));
        })
        .map((item, index) => {
            // console.log('map 시작');
            // console.log('item: ', item, typeof item);
            const poseFeedbackLength = Object.keys(data[item]).length;
            let posePointTotal = 0;
            if (poseFeedbackLength !== 0) {
                posePointTotal = Object.keys(data[item]).reduce((acc, cur) => {
                    // console.log('item: ', Object.keys(item))
                    // console.log('acc: ', acc, typeof acc, 'cur: ', cur, typeof cur);
                    return acc + data[item][cur]["0"]
                }, 0);
            }
            // console.log('item: ', item);
            // console.log(typeof item);
            // console.log('길이는: ', poseFeedbackLength);
            // console.log('토탈: ', posePointTotal);
            if (isNaN(posePointTotal / poseFeedbackLength)) {
                return 0;
            }
            return posePointTotal / poseFeedbackLength;
        });

    // console.log(poseAverage);

    const proShot = poseAverage
                        .map((item, index) => {
                            if (item >= 1.5) {
                                return String(index);
                            } else {
                                return;
                            }
                        })
                        .filter(item => (
                            item
                        ));
    // console.log('proShot', proShot);

    const badShot = poseAverage
                        .map((item, index) => {
                            if (item < 1.5) {
                                return String(index);
                            }
                        })
                        .filter(item => (
                            item
                        ))
    // console.log('badShot', badShot);        

    return (
        <View
            style={{
                flex: 1,
                marginVertical: 20,
            }}
        >
            <View style={{ height: 3, marginVertical: 8, backgroundColor: 'lightgreen'}}/>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight:'bold',
                    marginHorizontal:31,
                    marginTop: 0,
                    textAlign:"right"
                }}
            >{data.date}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                <MaterialIcons name="mood" size={20} color="black" />
                <Text style ={ styles.Text}>
                        당신의 프로샷
                </Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator ={false}
                style={styles.horizontalSCroll2}
            >
                {proShot && proShot.map((item, index) => (
                    <PerfectButton key={item} data={item} />
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                <MaterialIcons name="mood-bad" size={20} color="black" />
                <Text style ={ styles.Text}>
                        개선사항
                </Text>
            </View>
            {badShot && badShot.map((item, index) => (
                <Improvement key={index} data={data} index={item} imagePath={imagePath} token={token} />
            ))}                
        </View>
    )
};

export default ProShotAndImprovement;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        flexDirection:"row"

    },

    Awardsbox:{
        width:"92%",
        height:87,
        borderRadius:20,
        backgroundColor:"#FFF",
        position:'relative',
        marginLeft:8,
        marginTop:30,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:.84,
        elevation:5,
        flexDirection:"row",
        justifyContent:'space-between',
        
    },
    Imagebox:{
        width:63,
        maxHeight:70,
        borderRadius:20,
        backgroundColor:"#FFF",
        position:'relative',
        marginLeft:10,
        marginTop:10,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.15,
        shadowRadius:.84,
        elevation:2,  
    },
    Text :{
        fontSize:25,
        fontWeight:'bold',
        marginHorizontal: 10,
        // marginTop:30,
        textAlign:"left",
        // textAlignVertical: 'center'
    }, 
    IconStyle:{
        marginHorizontal:10,
        marginVertical:10
    },
    horizontalSCroll2:{
        // height:175,
        // width:"100%",
        // marginHorizontal:20,
        marginTop:30,
    },
    ProShotHeaderText :{
        fontSize:22,
        fontWeight:'bold',
        marginHorizontal:32,
    }, 
});
