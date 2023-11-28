import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

// Start Component
const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('white');
    const backgroundImage = require("../assets/bg-image.png");
    const colors = ['#a64e4e', '#a6704e', '#4ea64f', '#4e91a6', '#5f4ea6', '#686968']

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image} alt='laughing people in blurred filter'>
            <Text style={styles.title}>Chat App</Text>
            <View style={styles.inputContainer}>

                <Text>Start a conversation!</Text>
                {/* Username Input  */}
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your username'
                />
                <Text style={styles.colorSelectorLabel}>
                    Choose a background color:
                </Text>
                <View style={styles.colorList}>
                    {/* Background Select for Chats */}
                    {colors.map((color, index) => (

                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.box,
                                { backgroundColor: color },
                                background === color && styles.selected,
                            ]} onPress={() => setBackground(color)}>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* Button to Chats page */}
                <Button
                    title='Go to Chats'
                    onPress={() => navigation.navigate('Chat', { name: name, background: background })}
                />
            </View>
        </ImageBackground>
    );
}

// style guide
const styles = StyleSheet.create({
    title: {
        flex: 0.5,
        fontSize: 45,
        color: '#fff',
        width: '100%',
        textAlign: 'center',
        fontWeight: '700'
    },

    inputContainer: {
        backgroundColor: '#ffffff',
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: {
        fontSize: 16,
        width: '90%',
        padding: 10,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },

    image: {
        flex: 1,
        justifyContent: 'center',
    },

    colorSelectorLabel: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20
    },
    colorList: {
        flexDirection: 'row'
    },

    box: {
        width: 45,
        height: 45,
        margin: 5,
        borderRadius: 50,
    },

    selected: {
        borderWidth: 2,
        borderColor: 'black',
    }


});

// Export Start Component
export default Start;