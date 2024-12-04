import { AuthProvider } from "./context/authContext";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from "./screens/Home";

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
