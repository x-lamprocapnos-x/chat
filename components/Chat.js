// import statements
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
import { doc, addDoc, collection, onSnapshot, query, orderBy, } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

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

            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
                });
                //loadCachedMessages(newMessages);
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

    //render custom actions function
    const renderCustomActions = (props) => {
        return <CustomActions storage={db.storage} {...props} />;
    };

    // render custom view function
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

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
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
            //user={{
            //    _id: userID,
            //   name
            // }}
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