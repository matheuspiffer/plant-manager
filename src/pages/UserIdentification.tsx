import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableNativeFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export function UserIdentification() {
    const [isFocused, setIsfocused] = useState(false);
    const [name, setName] = useState<string>();
    const nagivation = useNavigation();
    function changeHandler(event: string) {
        setName(event);
    }

    async function handleSubmit() {
        if (!name) {
            return Alert.alert("Por favor, digite o seu nome");
        }
        await AsyncStorage.setItem("@plantmanager:user", name);
        nagivation.navigate("Confirmation", {
            title: "Prontinho",
            subtitle: "Agora vamos começar a cuidar das suas plantinhas com muito carinho",
            buttonTitle: "Começar",
            icon: "smile",
            nextScreen: "PlantSelect",
        });
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Como podemos{"\n"} chamar você?</Text>
                                <Text style={styles.emoji}></Text>
                            </View>
                            <TextInput
                                style={[styles.input, (isFocused || !!name) && { borderBottomColor: "green" }]}
                                placeholder="Digite seu nome"
                                onChangeText={changeHandler}
                                onFocus={() => setIsfocused(true)}
                                onBlur={() => setIsfocused(false)}
                            />
                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    content: {
        flex: 1,
        width: "100%",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 54,
        alignItems: "center",
    },
    header: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        color: colors.heading,
        textAlign: "center",
        lineHeight: 32,
        fontFamily: fonts.heading,
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center",
    },
    footer: {
        width: "100%",
        marginTop: 40,
        paddingHorizontal: 20,
    },
});
