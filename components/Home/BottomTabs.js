import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { USERS } from '../../data/users'
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons'


const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('home')


    return(
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.iconCont} onPress={() => setActiveTab('home')}>
                <Entypo name="home" size={24} color={activeTab === 'home' ? "white" : '#cdcdcd'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCont} onPress={() => setActiveTab('search')}>
                <Feather name="search" size={24} color={activeTab === 'search' ? "white" : "#cdcdcd" } />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCont} onPress={() => setActiveTab('movie')}>
                <MaterialIcons name="movie" size={24} color={activeTab === 'movie' ? "white" : "#cdcdcd"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCont} onPress={() => setActiveTab('like')}>
                { activeTab === 'like'  ? (<AntDesign name="heart" size={24} color="white" /> ) : (
                <AntDesign name="hearto" size={24} color="#cdcdcd" />
            )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('pic')}>
            <Image source={{ uri: USERS[0].image}} style={styles.profilePic(activeTab)} /> 
            </TouchableOpacity>
        </View>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        zIndex: 999,
        backgroundColor: '#000',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingLeft: 15,
        paddingRight: 15,
    },
    
    iconCont: {
        flex: 1,
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic: (activeTab) => ({
         width: 30,
         height: 30,
        borderRadius: 15,
        borderColor: activeTab === 'pic' ? 'white' : '#000',
        borderWidth:  activeTab === 'pic' ? 2 : 0,
    })
})