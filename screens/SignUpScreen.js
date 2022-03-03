import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, KeyboardAvoidingView } from 'react-native'
import SignUpForm from '../components/SignUp/SignUpForm'



const IG_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png'

const LoginScreen = ({ navigation }) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
        <View style={styles.logoCont}>
            <Image source={{ uri: IG_LOGO, height: 100, width: 100 }} />
        </View>
        <SignUpForm navigation={navigation} />
        <View style={styles.textCont}>
            <Text style={styles.text}>from</Text>
            <Text style={styles.textBig}>Exclusive Ideas</Text>
        </View>
    </KeyboardAvoidingView>
)

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50,
        paddingHorizontal: 12,
        position: 'relative'
    },
    logoCont: {
        alignItems: 'center',
        marginTop: 60,
    },
    text: {
        color: '#cdcdcd',
        fontSize: 17,
        fontWeight: '300'
    },
    textBig: {
        color: '#FF5349',
        fontSize: 23,
        fontWeight: '600',
    },
    textCont: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 82
    }
})