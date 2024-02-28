import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InputToolbar } from 'react-native-gifted-chat';
import { useEffect } from 'react';

// import screens
import Start from './components/Start';
import Chat from './components/Chat';

// import netInfo from react
import { useNetInfo } from '@react-native-community/netinfo';

// initialize firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// App Component
const App = () => {

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyAxmpadaPOlCjfxCPfRL4HTvWPW-cf1n2c",
    authDomain: "chatapp-9b3e1.firebaseapp.com",
    projectId: "chatapp-9b3e1",
    storageBucket: "chatapp-9b3e1.appspot.com",
    messagingSenderId: "274272467721",
    appId: "1:274272467721:web:f07b93d3c70f4ddd08f1d8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
        >
          {props => <Start db={db} {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name='Chat'
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// style guide
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//Export App Component
export default App;