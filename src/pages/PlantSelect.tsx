import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";


import { PlantsProps } from "../libs/storage";
import { Header } from "../components/Header";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { PrimaryPlantCard } from "../components/PrimaryPlantCard";
import { Load } from "../components/Load";

import api from "../services/api";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface PlantsEnvinronmentsProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [plantsEnrivironments, setPlantsEnrivironments] = useState<PlantsEnvinronmentsProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [environment, setEnvironment] = useState("all");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const navigation = useNavigation();
    useEffect(() => {
        getEnvironments();
        getPlants();
    }, []);

    async function getEnvironments() {
        const { data } = await api.get("plants_environments");
        setPlantsEnrivironments([{ key: "all", title: "Todos" }, ...data]);
    }
    async function getPlants() {
        try {
            const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
            if (page > 1) {
                setPlants((preValue) => [...preValue, ...data]);
                setFilteredPlants((preValue) => [...preValue, ...data]);
            } else {
                setPlants(data);
                setFilteredPlants(data);
            }
        } catch (error) {
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }
    function handleFetchingMore(distance: number) {
        if (distance < 1) return;

        setLoadingMore(true);
        setPage((prevValue) => prevValue + 1);
        getPlants();
    }
    function handleEnvironments(environment: string) {
        setEnvironment(environment);
        if (environment === "all") {
            return setFilteredPlants(plants);
        } else {
            const filtered = plants.filter((plant) => plant.environments.includes(environment));
            setFilteredPlants(filtered);
        }
    }
    function handlePlantSelct(plant: PlantsProps) {
        navigation.navigate("PlantSaved", { plant });
    }
    return (
        <View style={styles.container}>
            {loading ? (
                <Load />
            ) : (
                <>
                    <View style={styles.header}>
                        <Header />
                        <Text style={styles.title}>Em qual Ambiente</Text>
                        <Text style={styles.subtitle}>você quer colocar sua plantinha</Text>
                    </View>
                    <View>
                        <FlatList
                            keyExtractor={(item) => String(item.key)}
                            data={plantsEnrivironments}
                            renderItem={({ item }) => (
                                <EnvironmentButton
                                    title={item.title}
                                    active={environment === item.key}
                                    onPress={() => handleEnvironments(item.key)}
                                />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.environmentList}
                        />
                    </View>
                    <View style={styles.plants}>
                        <FlatList
                            keyExtractor={(item) => String(item.id)}
                            data={filteredPlants}
                            renderItem={({ item }) => (
                                <PrimaryPlantCard data={item} onPress={() => handlePlantSelct(item)} />
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            onEndReachedThreshold={0.1}
                            onEndReached={({ distanceFromEnd }) => handleFetchingMore(distanceFromEnd)}
                            ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>}
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
        backgroundColor: colors.background,
        padding: 20,
    },
    header: {},
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.heading,
        lineHeight: 20,
    },
    environmentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginVertical: 32,
        marginLeft: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
    },
});
