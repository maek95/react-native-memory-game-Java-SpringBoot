import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

//npx expo install expo-secure-store


//import * as Keychain from 'react-native-keychain'
// npx expo install react-native-keychain
// using keychain instead of AsyncStorage as its more secure...?

/* APPARENTLY KEYCHAIN DOESNT WORK WITH EXPO ROUTER - using SecureStore instead
How react-native-keychain works:
Storage Location: On iOS, the data is stored in the Keychain, and on Android, it is stored in the Keystore.
Persistence: The data stored using react-native-keychain persists across app restarts and device reboots. This means that even if you stop the Expo development server with ctrl+c and restart it with npx expo start, the stored credentials will still be available.
 */

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");

  async function login(newToken, currentUsername) {
    try {
      
      setToken(newToken);
      setCurrentUsername(currentUsername);
      setIsLoggedIn(true);

      await SecureStore.setItemAsync('userToken', newToken);
      await SecureStore.setItemAsync('username', currentUsername);
    } catch (error) {
      console.error('Error setting token and/or username in SecureStore', error);
    }
    //await Keychain.setGenericPassword('user', newToken);
  }

  async function logout() {
    try {
      
      setToken(null);
      setCurrentUsername("");
      setIsLoggedIn(false);
      //await Keychain.resetGenericPassword();
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('username');
    } catch (error) {
      console.error('Error deleting token and/or username from SecureStore', error);
    }
  }

  //  when the app is first initialized or when the AuthProvider component mounts. This approach ensures that the token is persisted across app restarts(?) and the user remains logged in.
  async function loadToken() {
    try { // TODO: doesnt like reading null password...TypeError
      //const tokenKeyChain = await Keychain.getGenericPassword();
      const storedToken = await SecureStore.getItemAsync('userToken');
      const storedUsername = await SecureStore.getItemAsync('username');
      if (storedToken) {
        //setToken(tokenKeyChain.password);
        setToken(storedToken);
        setCurrentUsername(storedUsername);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading token from SecureStore', error);
    }
  }

  useEffect(() => {
    loadToken();
  }, [])

  return (
    <AuthContext.Provider value={{token, login, logout, isLoggedIn, currentUsername}}>
      {children}
    </AuthContext.Provider>
  )

}

//export const useAuth = () => useContext(AuthContext);