// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator

} from 'react-native';
import {
    RegisterDevice,
    setApnFcmToken,
    isFcmApn,
    gluSDKDebuggingMode,
    configureLoaderColour,
    enableEntryPoints,
    SetCurrentClassName,
    SetCGCurrentClassName,
    allowAnonymousRegistration,
    enableAnalytic, configureLoadingScreenColor, configureStatusBarColour, configureSafeArea,
    configureDarkBackgroundColor,
    configureLightBackgroundColor,
    listenToDarkMode,
    enableDarkMode,configureLightLoaderURL,configureDarkLoaderURL,configureLightEmbedLoaderURL,configureDarkEmbedLoaderURL
} from '@customerglu/react-native-customerglu';
// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Platform } from 'react-native';
import { loadCGCampaign, registerUser, setCGScreenName } from "./customerglu/CGManger"



const RegisterScreen = ({ navigation }) => {
    const [userid, setUserId] = useState('')
    const route = useRoute();
    const [animating, setanimation] = useState(false)
    let userdataAndroid = null, userdataios = null, timer1 = null;
    useFocusEffect(
        React.useCallback( () => {
            console.log("route name", route.name, animating);
     

        }, [navigation])
    );

    useEffect( () => {
        requestUserPermission();


    
        const getTokentest = async () => {
            const token = await messaging().getToken();
            console.log('token------', token)
            if (Platform.OS === 'ios') {
                isFcmApn("fcm");
                setApnFcmToken(token, token);
            }

        }

        getTokentest();
        return () => {
            // unsubscribe();
            clearTimeout(timer1)
        }
    }, []);

    const setClassName= async ()=>{
    //    var e = await SetCGCurrentClassName("Register",Date.now().toString());
      //  console.log("My Epoch "+e)
    }

    async function requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus) {
            console.log('Permission status:', authorizationStatus);
        }
    }



    const handleSubmitButton = async () => {

      
        console.log("myuserId", userid)
        
        // Send registration data in Object     
        //  allowAnonymousRegistration(false)
        // setanimation(!animating)
       // if (token) {
           
            try {
                gluSDKDebuggingMode(true);
                
                //registerUser(userid)
                registerUser("7017430549");

                // setTimeout(()=>{

                // },2000)
                enableEntryPoints(true);
                navigation.replace('Home');
            }
            catch (e) {
                console.log('e:' + e);
            }
     //   }
        // else {
        //     if (!token) alert('Fcm Not Conneted!...')
        //     if (!userid) alert('please Enter User Id')

        // }


        // call register method here
        // if (userid) {
        //     try {
        //         if (Platform.OS === 'ios') {
        //             userdataios ? RegisterDevice(userdataios) : alert('Fcm Token not found.....')
        //         } else {
        //             userdataAndroid ? RegisterDevice(userdataAndroid) : alert('Fcm Token not found.....')
        //         }
        //     }
        //     catch (e) {
        //         console.log('e:' + e);
        //     }

        //     setUserId("")


        // } else {
        //     alert('please Enter User Id')
        // }
        // // await AsyncStorage.setItem("isRegisterScuccess", JSON.stringify(true));
        // navigation.navigate('HomeScreen')
        // // Navigate to the HomeScreen   
    };

    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center', height: 200 }}>
                    {/* <Image
                            source={require('./assets/focused/account.png')}
                            style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    /> */}
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(id) => setUserId(id)}
                            underlineColorAndroid="#000"
                            placeholder="User Id"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            testID="userIdField" // Add this line
                            accessibilityLabel="userIdField"
                            value={userid}
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}
                    
                        accessibilityLabel="registerButton">
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
                <ActivityIndicator
                    size={'large'}
                    color={'green'}
                    animating={animating}
                />
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#000',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#000',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dadae8',
        backgroundColor: '#dadae8'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
