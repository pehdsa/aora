import "@/styles/global.css"
import { StatusBar } from "react-native";
import { Loading } from "@/components/loading"
import { Stack } from "expo-router"
import { colors } from "@/styles/colors";

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { GlobalProvider } from "../../context/globalProvider";

export default function Layout() {
    const [ fontsLoaded ] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    })

    if(!fontsLoaded){
        return <Loading />
    }

    return (
        <GlobalProvider>
            <StatusBar barStyle="light-content" backgroundColor="#1616122" translucent />
            <Stack
                screenOptions={{
                    contentStyle: {
                        backgroundColor: colors.primary
                    }
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
            </Stack>
        </GlobalProvider>
    )
}