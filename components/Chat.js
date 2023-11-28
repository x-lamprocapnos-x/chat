import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

// Chat component
const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;
    const [messages, setMessages] = useState([]);
    // Upon sending new messages previous messages stay attatched
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    };

    // hook to update messages and append previous messages
    useEffect(() => {
        setMessages(previousMessages => [
            ...previousMessages,
            {
                _id: previousMessages.length + 1,
                text: "Hello developer",
                createdAt: new Date(),

            },
            {
                _id: previousMessages.length + 2,
                text: `Hello ${name}! How can I help you?`,
                createdAt: new Date,
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, [name]);

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

    // view of Chat with Selected background from Start.js
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text>Hello Chat!</Text>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name: 'You,' //sender's name
                }}
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