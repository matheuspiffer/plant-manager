import React from "react";
import { Welcome } from "./src/pages/Welcome";
import { UserIdentification } from "./src/pages/UserIdentification";
import { Confirmation } from "./src/pages/Confirmation";
import AppLoading from "expo-app-loading";
import { useFonts, Jost_400Regular, Jost_600SemiBold } from "@expo-google-fonts/jost";
import { SafeAreaView, StyleSheet } from "react-native";
import Routes from "./src/routes";
export default function App() {
    const [fontsLoeaded] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold,
    });

    if (!fontsLoeaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Routes />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
