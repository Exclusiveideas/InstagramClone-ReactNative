import { Text, FlatList, StyleSheet, SafeAreaView, View, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Home/Header';
import Stories from '../components/Home/Stories';
import Post from '../components/Home/Post';
import BottomTabs from '../components/Home/BottomTabs';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";



const HomeScreen = ({ navigation }) => {
   const [posts, setPosts] = useState([]);
   const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    getData();

    return () => {
      getData();
    }
  }, [])

  
  const getData = async() => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts([])
    querySnapshot.forEach((doc) => {
     setPosts(posts => [...posts, doc.data()])
  });
  }

  const onRefresh = () => {
    setRefreshing(true);
    
    getData();

    setRefreshing(false);
  }

    return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      {posts && (<FlatList
        ListHeaderComponent={<Stories />}
        data={posts}
        renderItem={({item}) => (<Post key={item.id} post={item} />)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> )}
      <BottomTabs />
    </SafeAreaView>
  )
  
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 50
  }
})


export default HomeScreen;