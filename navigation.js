import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewPostScreen from './screens/NewPostScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
}

export const SignedInStack = () => (
    <NavigationContainer  theme={{ colors: { background: '#000' } }} >
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions} >
            <Stack.Screen name="HomeScreen" component={HomeScreen }  />
            <Stack.Screen name="NewPostScreen" component={NewPostScreen } />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer  theme={{ colors: { background: '#000' } }} >
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions} >
            <Stack.Screen name="LoginScreen" component={LoginScreen } />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen } />
        </Stack.Navigator>
    </NavigationContainer>
)
