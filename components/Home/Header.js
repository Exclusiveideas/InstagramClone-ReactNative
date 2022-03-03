import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { getAuth, signOut } from "firebase/auth";
import { useStateValue } from '../../StateProvider';

const Header = ({ navigation }) => {
    const [{ user }, dispatch] = useStateValue();
    const auth = getAuth();

    const handleSignOut = async () => {
        Alert.alert(
            "Warning",
            "are you sure you want to sign out",
            [
                {
                    text: "Cancel",
                    
                },
                {
                    text: "Sign-out",
                    onPress: async () => {
                        try {
                            await signOut(auth)
                            dispatch({
                                type: 'SIGN_OUT'
                            })
                        } catch (error) {
                            console.log('error signing out >> ', error)
                            Alert.alert("Error signing out");
                        }
                    },
                },
            ],
            {
                cancelable: true,
            }
        );




    }


    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')} >
                    <AntDesign name="plussquareo" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut} style={{ marginLeft: 15, marginRight: -10 }}>
                    <FontAwesome name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
})

export default Header