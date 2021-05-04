import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Button } from "../components/Button";

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: "smile" | "hug";
    nextScreen: "string";
}

const emojis = {
    smile: ":)",
    hug: ":D",
};

export function Confirmation() {
    const navigation = useNavigation();
    const routes = useRoute();

    const { buttonTitle, icon, nextScreen, subtitle, title } = routes.params as Params;
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emojis[icon]}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <View style={styles.fotter}>
                    <Button title={buttonTitle} onPress={() => navigation.navigate(nextScreen)} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    emoji: {
        fontSize: 62,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        color: colors.heading,
        textAlign: "center",
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        color: colors.heading,
        textAlign: "center",
        fontSize: 17,
        paddingVertical: 10,
    },
    fotter: {
        width: "60%",
        marginTop: 20,
    },
});
