import { Text, View, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import { useStateValue } from '../../StateProvider'
import { collection, query, where, getDocs, serverTimestamp, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';

const IMAGE_PLACEHOLDER = 'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-237.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(IMAGE_PLACEHOLDER);
    const [{ user }, dispatch] = useStateValue();
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const genLikes = () => {
         const d = Math.floor(Math.random() * 40)
         return d
    }

    const getUsername = async () => {
        const q = query(collection(db, "users"), where("user_id", "==", user.user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setCurrentUser({
                username: doc.data().username,
                profilePicture: doc.data().profile_picture
            })
        });
    }

    useEffect(() => {
        getUsername();
    }, []);

    const uploadPost = async (values) => {
        setLoading(true);

        const addedDocRef = await addDoc(collection(db, "posts"), {
            user_id: user.user.uid,
            imageUrl: values.imageUrl,
            user: currentUser.username,
            profile_picture: currentUser.profilePicture,
            caption: values.caption,
            createdAt: serverTimestamp(),
            likes: genLikes(),
            likes_by_users: [],
            comments: [],
            id: ''
        });
        const docId = addedDocRef._key.path.segments[1];
        
        const updatedDocRef = doc(db, "posts", `${docId}`);

        await updateDoc(updatedDocRef, {
            id: docId
        })
        setLoading(false)

        navigation.navigate('HomeScreen');
    }

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                uploadPost(values);
            }
            }
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
                <>
                    <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : IMAGE_PLACEHOLDER }} style={{ width: 100, height: 100 }} />
                        <View style={{ flex: 1, marginLeft: 12 }} >
                            <TextInput
                                placeholder='Write a caption'
                                placeholderTextColor="gray"
                                style={{ color: 'white', fontSize: 20 }}
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <TextInput
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        placeholder='Enter Image url'
                        placeholderTextColor="gray"
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                        style={{ color: 'white', fontSize: 18, }}
                    />
                    <Divider width={0.2} orientation="vertical" />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red', marginBottom: 10, }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    {loading &&
                        <Text style={{ color: '#0096F6', fontWeight: '600', fontSize: 18, marginBottom: 10 }}>
                            Loading...
                        </Text>}
                    

                    <Button style={{ marginTop: 20 }} onPress={handleSubmit} title='Share' disabled={!isValid || loading} />
                </>
            }
        </Formik>
    )
}

export default FormikPostUploader