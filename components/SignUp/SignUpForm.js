import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as EmailValidator from 'email-validator';
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';


const userImages = [
    "https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png",
    "https://www.themobileindian.com/wp-content/uploads/2021/06/facebook-avatar-main.jpg",
    "https://cdn.mos.cms.futurecdn.net/HQBRR69rTKjho5qPhXxCrb.jpg",
    "https://i0.wp.com/www.tecteem.com/wp-content/uploads/2020/08/Facebook-Avatar-for-Africa1.jpg?resize=698%2C419&ssl=1",
    "https://i0.wp.com/www.jobfied.com/wp-content/uploads/2020/12/new-avatar-facebook-picture.png?resize=348%2C215&ssl=1",
    "https://pbs.twimg.com/media/EYVxlOSXsAExOpX.jpg",
]


const SignUpForm = ({ navigation }) => {
    const [{ user }, dispatch] = useStateValue();

    const [email, setEmail] = useState('');
    const [focusedEmail, setFocusedEmail] = useState(false);
    const [username, setUsername] = useState('');
    const [focusedName, setFocusedName] = useState(false);
    const [password, setPassword] = useState('');
    const [focusedPass, setFocusedPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const getRandomPicture = async () => {
        const index = Math.floor(Math.random() * 5);
        return userImages[index];
    }

    
  useEffect(() => {
    return () => {
      creatUser();
    }
  },[user])

  const creatUser = async() => {
        const authUser = await createUserWithEmailAndPassword(auth, email, password)
        return authUser
  }
    const onSignUp = async () => {
        setLoading(true);
        const auth = getAuth();
        try {
            const authUser = await creatUser();
            const image = await getRandomPicture();

            // Add a new document with a generated id.
            if (image && authUser) {
                await addDoc(collection(db, "users"), {
                    user_id: authUser.user.uid,
                    username: username,
                    email: authUser.user.email,
                    profile_picture: image,
                });
            }
            dispatch({
                type: 'SIGN_IN',
                user: {
                    user: authUser.user
                }
            })

        }
        catch (error) {
            const errorMessage = error.message;
            Alert.alert(errorMessage)
        }

        setLoading(false)

    }

    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputField, {
                borderColor: focusedEmail ? (EmailValidator.validate(email) ? '#ccc' : 'red') : '#ccc'
            }]}>
                <TextInput
                    placeholderTextColor="#cdcdcd"
                    placeholder='Phone number, username or email,'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    onChangeText={setEmail}
                    value={email}
                    onFocus={() => setFocusedEmail(true)}
                    style={styles.input}
                />
            </View>
            <View style={[styles.inputField, {
                borderColor: focusedName ? (username?.length > 1 ? '#ccc' : 'red') : '#ccc'
            }]}>
                <TextInput
                    placeholderTextColor="#cdcdcd"
                    placeholder='Username'
                    autoCapitalize='none'
                    onChangeText={setUsername}
                    value={username}
                    onFocus={() => setFocusedName(true)}
                    style={styles.input}
                />
            </View>
            <View style={[styles.inputField, {
                borderColor: focusedPass ? (password?.length >= 6 ? '#ccc' : 'red') : '#ccc'
            }]}>
                <TextInput
                    placeholderTextColor="#cdcdcd"
                    placeholder='Password'
                    autoCapitalize='none'
                    autoComplete={false}
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={setPassword}
                    value={password}
                    onFocus={() => setFocusedPass(true)}
                    style={styles.input}
                />
            </View>
            <Text style={{ fontSize: 10, color: 'red', marginBottom: 10, }}>
                {password && password.length < 6 && ('min of 6 characters')}
            </Text>

            <View style={{ alignItems: 'flex-end', marginBottom: 30 }} >
                <Text style={{ color: '#6BB0F5' }} >Forgot Password</Text>
            </View>
            {loading &&
                <Text style={{ color: '#0096F6', fontWeight: '600', fontSize: 18, marginBottom: 10 }}>
                    Loading...
                </Text>}
            <Pressable titleSize={20} disabled={loading || (!(EmailValidator.validate(email) && username?.length > 1 && password?.length >= 6))} style={styles.button} onPress={onSignUp} >
                <Text style={styles.buttonText} >Sign Up</Text>
            </Pressable>


            <View style={styles.LoginContainer}>
                <Text style={{ color: '#cdcdcd' }}>Already have an account?{' '}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#6BB0F5' }}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#000',
        marginBottom: 10,
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#0096F6',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    },
    buttonText: {
        fontWeight: "600",
        color: '#fff',
        fontSize: 20
    },
    LoginContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
    input: {
        backgroundColor: '#000',
        color: '#cdcdcd'
    }
})