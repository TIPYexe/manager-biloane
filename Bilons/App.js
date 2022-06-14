import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, SafeAreaView, Image, ImageBackground, Dimensions } from 'react-native';
// import { TouchableOpacity } from 'react-native-web';
// import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingVertical: 10,
  },
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
  optionStyle: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 50,
    padding: 15
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    marginBottom: -7,
  }
});

export default function App() {
  const [dataBiloane, setDataBiloane] = useState([]);
  const [selectedBilon, setSelectedBilon] = useState(null);
  const [bilonDetails, setBilonDetails] = useState(false);
  const deviceW = Dimensions.get('screen').width;
  const deviceH = Dimensions.get('screen').height;

  const ripeImg = ['https://i.ibb.co/72r7VKN/bilon0.png', 'https://i.ibb.co/wLWLrvW/bilon1.png', 'https://i.ibb.co/fkL93Fg/bilon2.png', 'https://i.ibb.co/JCVjcCR/bilon3.png', 'https://i.ibb.co/0GYyhWH/bilon4.png'];
  const reportTypes = ['sick', 'missing', 'other'];

  useEffect(() => {
    if (dataBiloane.length == 0) {
      for (let i = 1; i <= 10; i++) {
        let reportsAux = [];
        let nr = parseInt(Math.random() * 10);
        for (let j = 1; j <= nr; j++) {
          reportsAux.push({
            position: `${parseInt(Math.random() * 100)}%`,
            type: reportTypes[parseInt(Math.random() * 3)],
            images: []
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

  const renderBilon = ({ item }) => (
    <TouchableOpacity
      style={styles.bilonContainer}
      onPress={() => { setSelectedBilon(item); setBilonDetails(true); }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', minWidth: 70, textAlign: 'center' }}>{item.nr}</Text>
      <ImageBackground
        resizeMode="contain"
        source={{ uri: ripeImg[item.ripe] }}
        style={[selectedBilon?.nr != item.nr && { height: 60, flex: 1 }]}
        imageStyle={[selectedBilon?.nr != item.nr && { flex: 1, height: 60, width: 1920 / 2, left: -10 }]}
      />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <FlatList
          data={dataBiloane}
          renderItem={renderBilon}
        />
      </View>

      <Modal
        animationType='slide'
        visible={bilonDetails}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalOptions}>
            <Text
              style={[styles.optionStyle, { backgroundColor: 'rgba(0,0,0,0.2)' }]}
              onPress={() => { setBilonDetails(false); setSelectedBilon(null); }}
            >X</Text>
            <Text
              style={[styles.optionStyle, { backgroundColor: 'rgba(0,255,50,0.5)' }]}
              onPress={() => { }}
            >Add</Text>
          </View>
          <Image
            resizeMode="contain"
            source={{ uri: ripeImg[selectedBilon?.ripe] }}
            style={{
              width: '100%',
              height: 30,
            }} />
          <View style={{ width: '100%', height: 50 }}>
            {console.log(selectedBilon?.reports)}
            {selectedBilon?.reports.map((prop, key) => (
              <View key={key} style={{ position: 'absolute', left: prop.position, alignItems: 'center', zIndex: key }}>
                <View style={styles.triangle} />
                <View style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: 'black' }}>
                </View>
              </View>
            )
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );
}
