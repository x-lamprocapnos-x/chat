import { InputToolbar } from 'react-native-gifted-chat';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { doc, addDoc, collection, onSnapshot, query, where, orderBy, } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chat component
const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, background, userID } = route.params; // extract name, backround, and userID from route.params
    const [messages, setMessages] = useState([]);
    const [messagesText, setMessagesText] = useState('');

    // renderInputToolbar
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    // Upon sending new messages previous messages stay attatched
    const onSend = (newMessages) => {
        // Save the first message in the newMessages array to Firestore
        addDoc(collection(db, 'messages'), newMessages[0]);
    };

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("cachedMessages") || [];
        setMessages(JSON.parse(cachedMessages));
    };

    // hook to update messages and append previous messages
    useEffect(() => {
        let unsubMessages;
        if (isConnected === true) {

            //unregister current onSnapshot() listener to avoid registering
            // multiple listeners when useEffect is re-executed
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, 'messages'), where(
                'uid', '==', userID));
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data() })
                });
                loadCachedMessages(newMessages);
                setMessages(newMessages)
            });
        } else loadCachedMessages();

        // cleanup function
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected, userID]);

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
                renderInputToolbar={renderInputToolbar}
            />

            {isConnected === true &&
                <View style={styles.messageForm}>
                    <TextInput
                        placeholder='type message here'
                        value={messagesText}
                        onChangeText={setMessagesText}
                    />
                </View>
            }
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