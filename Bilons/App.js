import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
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
      let aux = [];
      for (let i = 1; i <= 10; i++) {
        aux.push({
          nr: i,
          ripe: parseInt(Math.random() * 5)
        });
      }
      setSelectedBilon(aux);
    }
  }, []);

  const renderBilon = (bilon) => (
    <TouchableOpacity
      style={{ padding: 5, alignItems: 'center' }}
      onPress={setSelectedBilon(bilon.nr)}>
      <Text style={{ fontSize: 10, fontWeight: 'bold', marginRight: 5 }}>{bilon.nr}</Text>
      <Image source={{ uri: ripeImg[bilon.ripe] }} style={[selectedBilon == bilon.nr && { height: 15, width: 'auto' }, selectedBilon != bilon.nr && { height: 5, width: 'auto' }]} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {dataBiloane.length != 10 &&
        <View style={{ height: 10, width: 10, backgroundColor: 'red' }}>
          {console.log(dataBiloane.length, dataBiloane)}
        </View>}
      {dataBiloane.length > 5 &&
        <>
          {console.log(dataBiloane.length, dataBiloane)}
          <FlatList
            data={dataBiloane}
            renderItem={renderBilon}
          // keyExtractor={(index) => index}
          />
        </>
      }
    </SafeAreaView>
  );
}
