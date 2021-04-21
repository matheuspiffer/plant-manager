import React from "react";
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from "react-native";
import colors from "../../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...rest}>
            <Text style={{ color: colors.white, fontSize: 24 }}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        borderRadius: 10,
        height: 56,
        width: 56,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
});
