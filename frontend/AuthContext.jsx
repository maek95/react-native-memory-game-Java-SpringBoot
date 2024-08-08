import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { host } from "./app/utils";

//npx expo install expo-secure-store


//import * as Keychain from 'react-native-keychain'
// npx expo install react-native-keychain
// using keychain instead of AsyncStorage as its more secure...?

/* APPARENTLY KEYCHAIN DOESNT WORK WITH EXPO ROUTER - using SecureStore instead
How react-native-keychain works:
Storage Location: On iOS, the data is stored in the Keychain, and on Android, it is stored in the Keystore.
Persistence: The data stored using react-native-keychain persists across app restarts and device reboots. This means that even if you stop the Expo development server with ctrl+c and restart it with npx expo start, the stored credentials will still be available.
 */

// SecureStore preserves data even when restarting the app, maybe this is better than staying "online" on backend and having to fetch logged in user from backend every time on restart?

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    if (token) { 
      verifyToken(token); // see if user still exists in backend when loading in frontend. Backend-data may have been deleted
    }
  }, [])

  async function verifyToken(token) {
    try {
      const response = await fetch(`${host}:8080/api/verify`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Origin': '*', // All origins atm...
        },
        
      })

      if (!response.ok) {
        console.log(`stored token is invalid, user ${currentUsername} was not found in backend. Deleting SecureStore data.`);
        
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('username');
        setIsLoggedIn(false);

      } else {

        const data = await response.json();
        console.log("Verification success:", data);
        
        // not needed, we 
       /*  setToken(token);
        setCurrentUsername(username);
        setIsLoggedIn(true); */
      }

    } catch (error) {
      console.error("Failed to verify token:", error);
    }
  }

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

  // TODO: add an useEffect that tests the currentUsername/token on the backend, to see if the username still exists? Mainly now that the data on backend in deleted when restarted...?

  return (
    <AuthContext.Provider value={{token, login, logout, isLoggedIn, currentUsername}}>
      {children}
    </AuthContext.Provider>
  )

}

//export const useAuth = () => useContext(AuthContext);