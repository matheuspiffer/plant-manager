import React from "react";
import { Text, StyleSheet, View, Animated } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../../styles/colors";
import { SvgFromUri } from "react-native-svg";
import fonts from "../../styles/fonts";
import { Feather } from "@expo/vector-icons";

interface SecondaryPlantCardProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export function SecondaryPlantCard({ data, handleRemove, ...rest }: SecondaryPlantCardProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton style={styles.removeButton} onPress={handleRemove}>
                            <Feather name="trash" size={32} color={colors.white} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri uri={data.photo} height={60} width={60} />
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>Regar ás</Text>
                    <Text style={styles.time}>{data.hour}</Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 10,
        alignItems: "center",
        marginVertical: 10,
        flexDirection: "row",
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
    },
    details: {
        alignItems: "flex-end",
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontSize: 16,
    },
    removeButton: {
        width: 100,
        height: 100,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        right: 20,
        paddingLeft: 15,
    },
});
