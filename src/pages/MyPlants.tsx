import React, { useEffect, useState } from "react";

import { View, StyleSheet, Image, Text, FlatList, ImageBackgroundBase, Alert } from "react-native";
import { Header } from "../components/Header";
import waterDrop from "../assets/waterdrop.png";
import { loadPlants, PlantsProps, removePlant, StoragePlantProps } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { SecondaryPlantCard } from "../components/SecondaryPlantCard";
import { Load } from "../components/Load";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadStorage() {
            try {
                const storagedPlants = await loadPlants();

                const nextTime = formatDistance(
                    new Date(storagedPlants[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    { locale: pt }
                );
                setNextWatered(`Não esqueça de regar a sua ${storagedPlants[0].name} em ${nextTime}`);

                setMyPlants(storagedPlants);
                console.log("my plants", storagedPlants);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        loadStorage();
    }, []);
    function handleRemove(plant: PlantsProps) {
        Alert.alert(`Remover`, `deseja remover a ${plant.name}`, [
            {
                text: "Não",
                style: "cancel",
            },
            {
                text: "Sim",
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((prevData) => prevData.filter((item) => item.id !== plant.id));
                    } catch (error) {
                        Alert.alert("Não foi possível remover");
                    }
                },
            },
        ]);
    }
    return (
        <View style={styles.container}>
            <Header />
            {loading ? (
                <Load />
            ) : (
                <>
                    <View style={styles.spotlight}>
                        <Image source={waterDrop} style={styles.spotlightImage} />
                        <Text style={styles.spotlightText}>{nextWatered}</Text>
                    </View>
                    <View style={styles.plants}>
                        <Text style={styles.plantsTitle}>Próximas regadas</Text>
                        <FlatList
                            data={myPlants}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <SecondaryPlantCard handleRemove={() => handleRemove(item)} data={item} />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flex: 1 }}
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
    },
    spotlight: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.blue_light,
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
    },
    spotlightImage: {
        marginRight: 12,
    },
    spotlightText: {
        flex: 1,
        fontSize: 15,
        fontFamily: fonts.text,
        color: colors.blue,
        textAlign: "center",
    },
    plants: {
        marginTop: 20,
        flex: 1,
        paddingHorizontal: 20,
    },
    plantsTitle: {
        fontSize: 32,
        color: colors.green,
        fontFamily: fonts.heading,
        marginBottom: 10,
    },
});
