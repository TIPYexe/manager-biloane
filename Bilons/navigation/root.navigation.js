import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Main,
    BilonPage,
} from "../screens";

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

function RootNavigation() {
    const Stack = createStackNavigator();

    const renderApp = () => (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="BilonPage"
                component={BilonPage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );

    return renderApp();
}

export default RootNavigation;