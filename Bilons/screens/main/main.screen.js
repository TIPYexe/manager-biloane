
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { AppContext } from "../../context/app.context";
import { Bilon } from "../../components";

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingVertical: 10,
        height: '100%'
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'purple',
        textAlign: 'center',
        marginBottom: 20
    }
});

export default function Main({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const { dataBiloane, setDataBiloane } = useContext(AppContext);

    useEffect(() => {
        if (dataBiloane?.length > 5) {
            setIsLoading(false);
        }
    }, [dataBiloane]);


    useEffect(() => {
        if (dataBiloane?.length == 0) {
            for (let i = 1; i <= 10; i++) {
                let reportsAux = [];
                let nr = parseInt(Math.random() * 10);
                for (let j = 1; j <= nr; j++) {
                    reportsAux.push({
                        position: parseInt(Math.random() * 20) * 5,
                        type: parseInt(Math.random() * 3),
                        images: ['https://i.ibb.co/QDQc1sV/IMG-20201224-WA0006.jpg', 'https://i.ibb.co/tJ1QvHG/IMG-20201224-WA0022.jpg', 'https://i.ibb.co/h86vKnC/IMG-20201224-WA0027.jpg']
                    })
                }

                setDataBiloane(dataBiloane => [...dataBiloane, {
                    nr: i,
                    ripe: parseInt(Math.random() * 5),
                    reports: reportsAux
                }]);
            }
        }
    }, [dataBiloane]);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            {!isLoading &&
                <>
                    <View style={[styles.container]}>
                        <Text style={styles.titleStyle}>Manager biloane</Text>
                        <Bilon data={dataBiloane} navigation={navigation} />
                    </View>
                </>
            }
            {isLoading &&
                <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="purple" />
                </View>}
        </View>
    );
}