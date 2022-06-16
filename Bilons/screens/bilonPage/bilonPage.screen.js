
import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator } from "react-native";
import { AppContext } from "../../context/app.context";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    modalOptions: {
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexDirection: 'row'
    },
    bilonCount: {
        fontSize: 30,
        fontWeight: 'bold',
        minWidth: 70,
        textAlign: 'center'
    },
    optionContainer: {
        backgroundColor: 'rgba(0,255,50,0.5)',
        borderColor: 'black',
        borderWidth: 3,
        justifyContent: 'center',
        borderRadius: 50,
        paddingHorizontal: 15,
        height: 45,
    },
    optionStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 20,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginBottom: -4,
    },
    reportShadow: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5,
    }
});

export default function BilonPage({ navigation }) {
    const { ripeImg, reportImg, reportTypes } = useContext(AppContext);
    const { setSelectedBilon, selectedBilon } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    function compare(a, b) {
        if (a.position < b.position) {
            return -1;
        }
        if (a.position > b.position) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        if (reportImg && ripeImg) {
            setIsLoading(false);
        }
    }, [reportImg, ripeImg]);

    const renderReport = ({ item }) => (
        <View style={{ padding: 10, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: reportImg[item.type] }} style={{ height: 30, width: 30, marginRight: 10 }} />
                <Text style={[styles.bilonCount, { fontSize: 20, textAlign: 'left' }]}>{reportTypes[item.type]}</Text>
            </View>
            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {item.images.map((prop) => (
                        <Image source={{ uri: prop }} style={{ height: 230, width: 120, borderRadius: 15, margin: 10 }} />
                    ))}
                </ScrollView>
            </View>
        </View >
    );

    return (
        <>
            {isLoading &&
                <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="purple" />
                </View>
            }
            {!isLoading &&
                <View style={styles.modalContainer}>

                    <View style={styles.modalOptions}>
                        <TouchableOpacity onPress={() => { setSelectedBilon(null); navigation.navigate('Main'); }}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992660.png' }} style={{ borderRadius: 50, height: 45, width: 45 }} />
                        </TouchableOpacity>
                        <Text style={styles.bilonCount}>{selectedBilon?.nr}</Text>
                        <TouchableOpacity
                            style={styles.optionContainer}
                            onPress={() => { }}>
                            <Text style={[styles.optionStyle]}>Adauga</Text>
                        </TouchableOpacity>
                    </View>

                    <Image
                        resizeMode="stretch"
                        source={{ uri: ripeImg[selectedBilon?.ripe] }}
                        style={{
                            width: '100%',
                            height: 35,
                        }} />

                    <View style={{ width: '100%', height: 50, paddingHorizontal: 5 }}>
                        {selectedBilon?.reports.sort(compare).map((prop, key) => (
                            <View key={key} style={[{ position: 'absolute', left: `${prop.position}%`, alignItems: 'center', zIndex: prop.position }]}>
                                <View style={[styles.triangle, { borderBottomColor: 'rgba(0,0,0,1)' }]} />
                                <View style={[{ padding: 2.5, borderRadius: 50, backgroundColor: 'white' }, styles.reportShadow, { elevation: 6 }]}>
                                    <Image source={{ uri: reportImg[prop.type] }} style={{ height: 35, width: 35 }} />
                                </View>
                            </View>
                        ))}
                    </View>

                    <Text style={[styles.bilonCount, { marginVertical: 20 }]}>Probleme raportate</Text>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={selectedBilon?.reports}
                        renderItem={renderReport}
                    />

                </View>
            }
        </>
    );
}