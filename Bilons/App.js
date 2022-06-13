import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
// import { TouchableOpacity } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [dataBiloane, setDataBiloane] = useState([]);
  const [selectedBilon, setSelectedBilon] = useState(null);
  const ripeImg = ['https://i.ibb.co/72r7VKN/bilon0.png', 'https://i.ibb.co/wLWLrvW/bilon1.png', 'https://i.ibb.co/fkL93Fg/bilon2.png', 'https://i.ibb.co/JCVjcCR/bilon3.png', 'https://i.ibb.co/0GYyhWH/bilon4.png'];

  useEffect(() => {
    if (dataBiloane.length == 0) {
      for (let i = 1; i <= 10; i++) {
        setDataBiloane(dataBiloane => [...dataBiloane, {
          nr: i,
          ripe: parseInt(Math.random() * 5)
        }]);
      }
    }
  }, [dataBiloane]);

  const renderBilon = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)', flexDirection: 'row', marginBottom: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
      onPress={() => setSelectedBilon(bilon.nr)}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', minWidth: 70, textAlign: 'center' }}>{item.nr}</Text>
      <Image style={[selectedBilon == item.nr && { height: 100, width: 100 }, selectedBilon != item.nr && { height: 60 }]} source={{ uri: ripeImg[item.ripe] }} resizeMode="center" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { paddingVertical: 10 }]}>
      <FlatList
        data={dataBiloane}
        renderItem={renderBilon}
        // keyExtractor={(index) => { index.nr }}
      />
    </SafeAreaView>
  );
}
