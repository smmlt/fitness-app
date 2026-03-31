import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from "@/constants/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from 'expo-router';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//     webClientId: '',
// });

export default  function Login()
{

    const title = 'login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const router = useRouter()

    // const googleSignIn = async () => {
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //
    //     const signInResult = await GoogleSignin.signIn();
    //
    //     let idToken = signInResult.data?.idToken;
    //
    //     if (!idToken) {
    //         throw new Error('No ID token found');
    //     }
    //
    //     const googleCredential = GoogleAuthProvider.credential(idToken);
    //
    //     return signInWithCredential(auth, googleCredential);
    // }

    const handleAuth = async () => {
        if (!email || !password)
        {
            alert('Not all fields are filled')
            return
        }

        try {
            if (isRegistering)
            {
                await createUserWithEmailAndPassword(auth, email, password)
                alert('created successfully')
            }
            else
            {
                await signInWithEmailAndPassword(auth, email, password)
                alert('created successfully')
            }
        }
        catch (e: any)
        {
            let errMessage = 'Authorisation error: '

            alert(e.message)
            // if (e.code === 'auth/email-already-in-use')
            //     errMessage +=
        }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
        },
        titleText: {
            fontSize: 16,
            fontWeight: '500',
            color: 'purple'
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1a1a1a'
        },
        subtitle: {
            fontSize: 18,
            color: '#404040'
        },
        emoji: {
            fontSize: 50,
            textAlign: 'center',
            marginBottom: 10
        },
        innerContainer: {
            flex: 1, padding: 25
        },
        input: {
            backgroundColor: '#f5f5f5',
            padding: 15
        },
        mainButton: {
            marginTop: 10,
            backgroundColor: '#007aff',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            padding: 12,
            marginBottom: 8
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center'
        },
        switchButton: {

        },
        switchText: {
            color: '#007aff'
        }
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.emoji}>💪</Text>
                <Text style={styles.title}>{isRegistering ? "Register" : "Welcome back"}</Text>
                <Text style={styles.subtitle}>{isRegistering ? "Register to begin your journey" : "Login to continue your journey"}</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={setEmail}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}

                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={handleAuth}
                >
                    <Text style={styles.buttonText}>
                        {isRegistering ? "Register" : "Login"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.switchButton}
                    onPress={(e) => {
                        setIsRegistering(!isRegistering)
                    }}
                >
                    <Text style={styles.switchText}>
                        {isRegistering ? "Already have an account? Login instead" : "Do not have an account? Register instead"}
                    </Text>
                </TouchableOpacity>


                {/*<TouchableOpacity*/}
                {/*    style={styles.mainButton}*/}
                {/*    onPress={(e) => {*/}
                {/*        // googleSignIn()*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Text style={styles.buttonText}>*/}
                {/*         Sign in with Google*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </KeyboardAvoidingView>
    )
}