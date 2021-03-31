import * as React from 'react';
import {
    StatusBar,
    StyleSheet,
    Alert,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
    Dimensions,
} from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import * as Sharing from 'expo-sharing';
import AuthContext from '../../Context/AuthContext';

import { SERVER_IP } from '../../constants';
const { width, height } = Dimensions.get('window');

const ITEM_SIZE = width * 0.75;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) * 0.5;

const Info = ({ data, inputRange, scrollX }) => {
    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });

    const good = Object.keys(data)
                    .filter(key => (
                        data[key][0] == 2
                    ))
                    .map((key, index) => ({
                        key: index,
                        info: data[key][2],
                    }));

    console.log(good);

    const normal = Object.keys(data)
                    .filter(key => (
                        data[key][0] == 1
                    ))
                    .map((key, index) => ({
                        key: index,
                        info: data[key][2],
                    }));

    const bad = Object.keys(data)
                    .filter(key => (
                        data[key][0] == 0
                    ))
                    .map((key, index) => ({
                        key: index,
                        info: data[key][2],
                    }));
    
    return (
        <ScrollView  
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10, }}
        >
            {good && <Animated.FlatList
                data={good}
                keyExtractor={item => item.key.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <Animated.View
                        style={{
                            opacity,
                            flexDirection: 'row',
                        }}
                    >
                        <Ionicons name="checkmark-circle" size={32} color="#73E681" />
                        <Text style={{ marginRight: 30, marginVertical: 10, lineHeight: 20 }}>{item.info}</Text>
                    </Animated.View>
                )}
            />}
            {normal && <Animated.FlatList
                data={normal}
                keyExtractor={item => item.key.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <Animated.View
                        style={{
                            opacity,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Ionicons name="caret-up-circle" size={32} color="#FFF500" />
                        <Text style={{ marginRight: 30, marginVertical: 10, lineHeight: 20 }}>{item.info}</Text>
                    </Animated.View>
                )}
            />}
            {bad && <Animated.FlatList
                data={bad}
                keyExtractor={item => item.key.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <Animated.View
                        style={{
                            opacity,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons name="close-circle" size={32} color="#FF0000" />
                        <Text style={{ marginRight: 30, marginVertical: 10, lineHeight: 20 }}>{item.info}</Text>
                    </Animated.View>
                )}
            />}
        </ScrollView>
    )
}

const Indicator = ({ data, scrollX }) => {
    data = [{ key: 'empty-left' }, ...data, { key: 'empty-right' }];
    const indicatorContainerWidth = width * 0.4
    return (
        <View
            style={{
                 position: 'absolute',
                 alignSelf: 'center',
                //  backgroundColor: 'red',
                 bottom: height * 0.91,
                 width: width,
                 flexDirection: 'row',
                 justifyContent: 'space-between',
            }}
        >
            {data.map((item, index) => {
                const inputRange = [
                    (index - 2) * ITEM_SIZE,
                    (index - 1) * ITEM_SIZE,
                    index * ITEM_SIZE,
                ];
            
                const itemWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [
                        indicatorContainerWidth / 10 * 0.5 ,
                        indicatorContainerWidth / 8 * 1.2 , 
                        indicatorContainerWidth / 10 * 0.5 ],
                    extrapolate: 'extend',
                });

                const itemColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#E6E6E6', '#73E681', '#E6E6E6'],
                })

                if (!item.image) {
                    return
                }
                return(
                    <Animated.View 
                        style={{
                         width: itemWidth,
                         height: 5,
                         backgroundColor: itemColor,
                         borderRadius: 4,
                        }}
                        key={index}
                    />
                )
            })}
        </View>
    )
}

const ImageList = ({ data, scrollX, token }) => {

    data = [{ key: 'empty-left' }, ...data, { key: 'empty-right' }];

    return (
        <View style={{ flex: 1 }}>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={item => item.key}
                horizontal
                bounces={false}
                decelerationRate={0}
                // contentContainerStyle={{ alignItems: 'center' }}
                snapToInterval={ITEM_SIZE}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                  )}
                renderItem={({ item, index }) => {
                    if (!item.image) {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        // extrapolate: 'clamp',
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                    })

                    console.log(item);
                    return (
                        <View style={styles.viewContainer}>
                            <Animated.View
                                style={{
                                    // marginHorizontal: 10,
                                    // marginVertical: 0,
                                    margin: 0,
                                    padding: 0,
                                    // alignItems: 'center',
                                    borderRadius: 30,
                                    // backgroundColor: 'black',
                                    transform: [{ scale }],
                                }}
                            >
                                <Image
                                    style={styles.poseImage}
                                    source={{ 
                                        uri: `http://${SERVER_IP}:80/get-image/${item.image}_${index - 1}`,
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    }}
                                />
                            </Animated.View>
                            <Animated.Text
                                style={{
                                    marginTop: 20,
                                    opacity,
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                }}
                            >
                                {item.key}
                                {/* <Info data={item.feedback} scrollX={scrollX} /> */}
                            </Animated.Text>
                            <Info data={item.feedback} inputRange={inputRange} scrollX={scrollX} />
                        </View>    
                    )
                }}
            />
        </View>
    )
}

const FeedbackScreen = ({ navigation, route }) => {
    const { data, token, videoUri } = route.params;
    // const data = TEST_DATA;
    const scrollX = React.useRef(new Animated.Value(0)).current;

    // 친구에게 공유 버튼 클릭 시
    const share = async () => {
        // 공유가 가능한지 체크
        let sharingAvailable = await Sharing.isAvailableAsync();
        if (!sharingAvailable) {
            Alert.alert("현재 디바이스에서 공유가 불가합니다.");
        }
        Sharing.shareAsync(
            videoUri,
            {
                mimeType: 'video/mp4',
                dialogTitle: '스윙을 친구에게 공유하세요'
            }
        )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                // 스택 헤더 공유 버튼
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* 다른 앱에 공유 버튼 */}
                    <TouchableOpacity
                        onPress={share}
                        style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }}
                    >
                        <AntDesign name="sharealt" size={24} color="black" />
                        <Text style={{ fontSize: 8 }}>친구에게 공유</Text>
                    </TouchableOpacity>
                    {/* 소셜에 동영상 업로드 버튼 */}
                    <TouchableOpacity 
                        style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }}
                        onPress={() => {
                            Alert.alert(
                                "소셜 업로드",
                                "내 스윙을 모든 골프렌드에게 공유합니다",
                                [
                                    {
                                        text: "취소",
                                        style: 'cancel'
                                    },
                                    {
                                        text: "확인",
                                        onPress: async () => {
                                            console.log(data[0].image)
                                            await axios.post(
                                                `http://${SERVER_IP}:80/post-social-video`,
                                                {
                                                    'video': data[0].image,
                                                },
                                                {
                                                    headers: {
                                                        'Authorization': `Bearer ${token}`
                                                    }
                                                }
                                            )
                                            .then(res => {
                                                console.log(res.data);
                                                navigation.navigate('Social');
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
                                        }
                                    }
                                ]
                            )
                        }}    
                    >
                        <Entypo name="slideshare" size={24} color="black" />
                        <Text style={{ fontSize: 8 }}>소셜에 업로드</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    })

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageList data={data} scrollX={scrollX} token={token} />
            {/* <InfoList data={data} scrollX={scrollX} /> */}
            <Indicator data={data} scrollX={scrollX} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    viewContainer: {
        width: ITEM_SIZE,
        marginTop: 30,
    },
    poseImage: {
        width: '100%',
        height: height * 0.5,
        resizeMode: 'cover',
        // backgroundColor: 'blue',
        borderRadius: 30,
        marginHorizontal: 0,
        paddingHorizontal: 0,
    }
})

export default FeedbackScreen;