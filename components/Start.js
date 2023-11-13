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

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('white');
    const backgroundImage = require("../assets/bg-image.png");
    const colors = ['#ffe1c7', '#cdffc7', '#caf3fc', '#caccfc', '#a9a9ab']

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <View style={styles.inputContainer}>

                <Text>Start a conversation!</Text>
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
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: {
        fontSize: 16,
        width: '90%',
        padding: 15,
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
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: 15,
    },

    selected: {
        borderWidth: 2,
        borderColor: 'black',
    }

});

export default Start;