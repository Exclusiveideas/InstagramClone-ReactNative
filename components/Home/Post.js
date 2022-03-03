import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { updateDoc, arrayUnion, arrayRemove, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';

const Post = ({ post }) => (
    <View style={{ marginTop: 10 }}>
        <PostHeader post={post} />
        <PostImage post={post} />
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <View>
            {post?.comments?.length > 0 ? (
                <>
                    <CommentSection post={post} />
                    <Comments post={post} />
                </>
            ) : (<NoCommentSection />)}
        </View>
    </View>
)

const PostHeader = ({ post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: post.profile_picture }} style={styles.profile_pic} />
            <Text style={{ color: "#fff", marginLeft: 5, fontWeight: "700" }}>
                {post.user}
            </Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Entypo name="dots-three-vertical" size={18} color="white" />
        </TouchableOpacity>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450 }}>
        <Image source={{ uri: post.imageUrl }}
            style={{ height: '100%', resizeMode: 'cover' }}
        />
    </View>
)

const PostFooter = () => {
    const [liked, setliked] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleLiked = async () => {
        setliked(!liked)
    }

    return (
        <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5, paddingRight: 10 }}>
            <View style={styles.leftFooterIconsContainer}>
                <TouchableOpacity onPress={handleLiked}>
                    {liked ? (<AntDesign name="heart" size={24} color="red" />) :
                        (<AntDesign name="hearto" size={24} color="white" />)}
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="message-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setSaved(!saved)} style={{ alignItems: 'flex-end', flex: 1 }}>
                {saved === true ? (<Ionicons name="bookmark" size={24} color="white" />) : (
                    <Feather name="bookmark" size={24} color="white" />)}
            </TouchableOpacity>
        </View>
    )
}


const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4, paddingLeft: 12 }} >
        <Text
            style={{ color: 'white', fontWeight: "600" }}>
            {post.likes.toLocaleString('en-US')} likes
        </Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5, paddingLeft: 12 }}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '800' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const NoCommentSection = () => (
    <Text style={{ color: 'gray' }}>
        No Comments
    </Text>
)

const CommentSection = ({ post }) => (
    <Text style={{ color: 'gray', paddingLeft: 12 }}>
        View {commentsLength(post)}
        {post?.comments?.length > 1 ? ' comments' : ' comment'}
    </Text>
)

const commentsLength = (post) => {
    if (post?.comments.length < 11) {
        return post?.comments.length;
    }
    else if (post?.comments.length > 11) {
        return `All ${post?.comments.length}`;
    }
}

const Comments = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 12 }} >
        <Text style={{ color: 'white' }} >
            <Text style={{ fontWeight: "800" }}>{post?.comments[0].user}</Text>{' '}
            {post?.comments[0].comment}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    profile_pic: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
        paddingLeft: 10
    },
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -3,
    }
})


export default Post