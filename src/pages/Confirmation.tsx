import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Button } from "../components/Button";
export function Confirmation() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{":)"}</Text>
                <Text style={styles.title}>Prontinho</Text>
                <Text style={styles.subtitle}>Agora vamos começar a cuidar das suas plantinhas com muito carinho!</Text>
                <View style={styles.fotter}>
                    <Button title="Continuar" />
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
