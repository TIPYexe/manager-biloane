import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
// import { TouchableOpacity } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  bilonContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,

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
      style={styles.bilonContainer}
      onPress={() => setSelectedBilon(item.nr)}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', minWidth: 70, textAlign: 'center' }}>{item.nr}</Text>
      <Image
        // resizeMode="cover"
        source={{ uri: ripeImg[item.ripe] }}
        style={[{ backgroundColor: 'black', overflow: 'visible' }, selectedBilon != item.nr && { height: 60, flex: 1 }, selectedBilon == item.nr && { flex: 1, height: 20, width: undefined },]} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={dataBiloane}
        renderItem={renderBilon}
      />
    </SafeAreaView>
  );
}
