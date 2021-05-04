import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import userImg from "../assets/me.png";

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        loadUserNameFromStorage();
    }, []);

    async function loadUserNameFromStorage() {
        const user = await AsyncStorage.getItem("@plantmanager:user");
        setUserName(user || "");
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: getStatusBarHeight()
    },
    greeting: {
        fontSize: 32,
        fontFamily: fonts.text,
        color: colors.heading,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 32,
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 40,
    },
});
