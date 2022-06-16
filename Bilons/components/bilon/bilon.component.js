
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground, View } from "react-native";
import { AppContext } from '../../context/app.context';

const styles = StyleSheet.create({
    bilonContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    bilonCount: {
        fontSize: 30,
        fontWeight: 'bold',
        minWidth: 70,
        textAlign: 'center'
    },
});

export default function Bilon({ navigation, data }) {
    const { ripeImg } = useContext(AppContext);
    const { setSelectedBilon } = useContext(AppContext);

    const renderBilon = ({ item }) => (
        <TouchableOpacity
            style={styles.bilonContainer}
            onPress={() => { setSelectedBilon(item); navigation.navigate('BilonPage'); }}>
            <Text style={styles.bilonCount}>{item.nr}</Text>
            <ImageBackground
                resizeMode="contain"
                source={{ uri: ripeImg[item.ripe] }}
                style={[{ height: 60, flex: 1 }]}
                imageStyle={[{ flex: 1, height: 60, width: 1920 / 2, left: -10 }]}
            />
        </TouchableOpacity>
    );

    return (
        <>
            <FlatList
                data={data}
                renderItem={renderBilon}
            />
        </>
    );
}