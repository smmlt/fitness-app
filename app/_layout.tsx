import { auth } from '@/constants/FirebaseConfig';
import { User, onAuthStateChanged } from "@firebase/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from 'react-native';



export default function RootLayout() {

    const [user, setUser] = useState<User | null>(null)
    const [initializing, setInitializing] = useState(true)

    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            setUser(_user)
            if (initializing)
            {
                setInitializing(false)
            }
        })

        return unsubscribe


    }, []);

    useEffect(() => {
      if (initializing)
      {
        return
      }

      const inAuthGroup = (segments[0] == '(auth)')

      if (!user && !inAuthGroup)
      {
        router.replace('/(auth)/login')
      }
      else if (user && inAuthGroup)
      {
        router.replace('/(tabs)')
      }
    }, [user, segments, initializing]);

    if (initializing)
    {
      return <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator/>
      </View>
    }
    // return <Tabs/>
    return <Stack

    />;
}
