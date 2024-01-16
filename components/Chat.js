import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

// Chat component
const Chat = ({ route, navigation, db }) => {
    const { name, background, userID } = route.params; // extract name, backround, and userID from route.params
    const [messages, setMessages] = useState([]);

    // Upon sending new messages previous messages stay attatched
    const onSend = (newMessages) => {
        // Save the first message in the newMessages array to Firestore
        addDoc(collection(db, 'messages'), newMessages[0]);
    };

    // hook to update messages and append previous messages
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'messages'), orderBy('createdAt', 'desc')),
            (snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    //convert timestamp to date object
                    const createdAt = data.createdAt.toDate();
                    return {
                        _id: doc.id,
                        text: data.text,
                        createdAt,
                        user: data.user,
                    };
                });
                setMessages(messages);
            }
        );
        // cleanup function
        return () => unsubscribe();
    }, [name, db]);

    // Screen Title (Username from Start.js)
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name]);

    // Chat bubble color style
    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#454444', // Custom color for the sender's bubbles
                    },
                    left: {
                        backgroundColor: '#ffffff', // Custom color for the receiver's bubbles
                    },
                }}
            />
        );
    };

    // Update the user prop with extracted userID and name
    const user = {
        _id: userID, // Use the extracted userID
        name: name, // Use the extracted name
    };

    // view of Chat with Selected background from Start.js
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Hello Chat!</Text>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={user}
                renderBubble={renderBubble}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

// style guide
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

// export component
export default Chat;