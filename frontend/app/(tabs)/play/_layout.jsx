import { Stack, useGlobalSearchParams } from 'expo-router';


export default function GameLayout() {



  return <Stack screenOptions={{
    /* title: 'Game', */
    headerStyle: {
      backgroundColor: "teal",
      borderWidth: 0,
     /*  elevation: 0, // Remove shadow on Android  <- remove shadow in <Tabs>?
      shadowOpacity: 0, // Remove shadow on iOS
      shadowColor: 'transparent' */
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontFamily: 'SourceCodePro-Medium', 
    },
    headerShadowVisible: false, // remove shadow in <Stack>?
  }} 
    
    >
      <Stack.Screen name='selectdifficulty' options={{
        title: 'Game',
        /* headerStyle: {backgroundColor: "teal",
          borderWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        }, */
      }}>

      </Stack.Screen>

      <Stack.Screen
        name="game/[difficulty]"
        options={({ route }) => ({
          title: `${route.params?.difficulty || '[difficulty]'} Difficulty`,
        })}
      />

    </Stack>;
}
