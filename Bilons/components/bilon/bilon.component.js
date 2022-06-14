
import React from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground } from "react-native";

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

export default function Bilon({ navigation, dataBiloane, onPress }) {
    const ripeImg = ['https://i.ibb.co/72r7VKN/bilon0.png', 'https://i.ibb.co/wLWLrvW/bilon1.png', 'https://i.ibb.co/fkL93Fg/bilon2.png', 'https://i.ibb.co/JCVjcCR/bilon3.png', 'https://i.ibb.co/0GYyhWH/bilon4.png'];

    const renderBilon = ({ item }) => (
        <TouchableOpacity
            style={styles.bilonContainer}
            onPress={() => { setSelectedBilon(item); setBilonDetails(true); }}>
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
        <FlatList
            data={dataBiloane}
            renderItem={renderBilon}
        />
    );
}