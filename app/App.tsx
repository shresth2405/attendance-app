import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/AppNavigator';
import { initDB } from './database/initDB';

const App = () => {
  useEffect(() => {
    initDB().catch(error => {
      console.error("Database initialization failed:", error);
    });
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;