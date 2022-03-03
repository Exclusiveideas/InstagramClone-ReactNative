import { Pressable, StyleSheet, Text, TextInput, Alert, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as EmailValidator from 'email-validator';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useStateValue } from '../../StateProvider'


const LoginForm = ({ navigation }) => {
  const [{ user }, dispatch] = useStateValue();
    const auth = getAuth();

  const [email, setEmail] = useState('');
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [focusedPass, setFocusedPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      login();
    }
  },[user])

  const login = async () => {
    const authUser = await signInWithEmailAndPassword(auth, email, password)
    return authUser
  }

  const onSignIn = async () => {
    setLoading(true)
    try {
      const authUser = await login();

      dispatch({
        type: 'SIGN_IN',
        user: {
          user: authUser.user
        }
      });
      
    }
    catch (error) {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    }
    setLoading(false)
  }


  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputField, {
        borderColor: focusedEmail ? (EmailValidator.validate(email) ? '#ccc' : 'red') : '#ccc'
      }]}>
        <TextInput
          placeholderTextColor="#fff"
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
      <View style={{ alignItems: 'flex-end', marginBottom: 30 }} >
        <Text style={{ color: '#6BB0F5' }} >Forgot Password</Text>
      </View>
      {loading &&
        <Text style={{ color: '#0096F6', fontWeight: '600', fontSize: 18, marginBottom: 10 }}>
          Loading...
        </Text>}
      <Pressable titleSize={20} disabled={loading || (!(EmailValidator.validate(email) && password?.length >= 6))} style={styles.button} onPress={onSignIn} >
        <Text style={styles.buttonText} >Log In</Text>
      </Pressable>

      <View style={styles.signUpContainer}>
        <Text style={{ color: '#cdcdcd' }}>Don't have an account?{' '}</Text>
        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
          <Text style={{ color: '#6BB0F5' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginForm

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
  signUpContainer: {
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