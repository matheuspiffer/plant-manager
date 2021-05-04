import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../../styles/colors";

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
import { PlantSelect } from "../pages/PlantSelect";
import { PlantSaved } from "../pages/PlantSaved";
import { MyPlants } from "../pages/MyPlants";
import AuthRoutes from "./tab.routes";

const stackRoutes = createStackNavigator();

const AppRoutes: FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white,
            },
        }}
    >
        <stackRoutes.Screen name="Welcome" component={Welcome} />
        <stackRoutes.Screen name="UserIdentification" component={UserIdentification} />
        <stackRoutes.Screen name="Confirmation" component={Confirmation} />
        <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
        <stackRoutes.Screen name="PlantSaved" component={PlantSaved} />
        <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />
    </stackRoutes.Navigator>
);

export default AppRoutes;
