import React, { useState } from "react";

import { Alert, StyleSheet, View, Text, Image, ScrollView, Platform, TouchableOpacity } from "react-native";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { SvgFromUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Button } from "../components/Button";

import DataTimePicker, { Event } from "@react-native-community/datetimepicker";

import colors from "../../styles/colors";
import waterDrop from "../assets/waterdrop.png";
import fonts from "../../styles/fonts";
import { format, isBefore } from "date-fns";
import { loadPlants, PlantsProps, savePlant } from "../libs/storage";

interface Params {
    plant: PlantsProps;
}
export function PlantSaved() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");
    const navigation = useNavigation();
    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === "android") {
            setShowDatePicker(!showDatePicker);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora no futuro");
        }
        if (dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime,
            });

            navigation.navigate("Confirmation", {
                title: "Tudo certo",
                subtitle: "Fique tranquilo que vamos lembrar de você cuidar da sua plantinha com bastante amor",
                buttonTitle: "Muito obrigado",
                icon: "hug",
                nextScreen: "MyPlants",
            });
        } catch (error) {
            Alert.alert("Não foi possível salvar");
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} height={120} />

                    <Text style={styles.plantName}>{plant.name}</Text>

                    <Text style={styles.plantAbout}>{plant.about}</Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image source={waterDrop} style={styles.tipImage} />

                        <Text style={styles.tipText}>{plant.water_tips}</Text>
                    </View>
                    <View>
                        <Text style={styles.reminderLabel}>Escolha o melhor horário para ser lembrado</Text>
                        {showDatePicker && (
                            <DataTimePicker
                                value={selectedDateTime}
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                            />
                        )}

                        {Platform.OS === "android" && (
                            <TouchableOpacity
                                style={styles.dateTimePickerButton}
                                onPress={() => {
                                    setShowDatePicker(!showDatePicker);
                                }}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`mudar ${format(selectedDateTime, "HH:mm")}`}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <Button title="Cadastrar Planta" onPress={handleSave} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
        marginTop: getStatusBarHeight()
    },
    plantInfo: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    controller: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: getBottomSpace() || 10,
        paddingHorizontal: 20,
        position: "relative",
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
    },
    plantAbout: {
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
    },
    tipContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.blue_light,
        borderRadius: 16,
        marginTop: 20,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: "justify",
    },
    reminderLabel: {
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginVertical: 5,
    },
    dateTimePickerButton: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
});
