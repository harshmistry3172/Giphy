import React from 'react';
import { NavigationContainer, ThemeContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './src/context/ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Giphy', headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>
    </ThemeProvider>
  );
};

export default App;
