import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from "./Navigation";
import * as React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
