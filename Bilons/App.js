import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, SafeAreaView, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Bilon } from './components';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingVertical: 10,
    height: '100%'
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

export default function App() {
  const [dataBiloane, setDataBiloane] = useState([]);
  const [selectedBilon, setSelectedBilon] = useState(null);
  const [bilonDetails, setBilonDetails] = useState(false);
  const deviceW = Dimensions.get('screen').width;
  const deviceH = Dimensions.get('screen').height;

  const ripeImg = ['https://i.ibb.co/72r7VKN/bilon0.png', 'https://i.ibb.co/wLWLrvW/bilon1.png', 'https://i.ibb.co/fkL93Fg/bilon2.png', 'https://i.ibb.co/JCVjcCR/bilon3.png', 'https://i.ibb.co/0GYyhWH/bilon4.png'];
  const reportTypes = ['Planta bolnava', 'Planta lipsa', 'Altceva'];
  const reportImg = ['https://cdn-icons.flaticon.com/png/512/5610/premium/5610989.png?token=exp=1655226659~hmac=381788422552f564452ceda793d0117e', 'https://cdn-icons-png.flaticon.com/512/189/189665.png', 'https://cdn-icons.flaticon.com/png/512/722/premium/722353.png?token=exp=1655226712~hmac=571e72a3cd63ee732852c64ed878b792'];

  useEffect(() => {
    if (dataBiloane.length == 0) {
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

  function compare(a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  }

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
    <SafeAreaView>
      <View style={[styles.container]}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'purple', textAlign: 'center', marginBottom: 20 }}>Manager biloane</Text>
        <Bilon dataBiloane={dataBiloane} />
      </View>

      <Modal
        animationType='slide'
        visible={bilonDetails}
      >
        <View style={styles.modalContainer}>

          <View style={styles.modalOptions}>
            <TouchableOpacity onPress={() => { setBilonDetails(false); setSelectedBilon(null); }}>
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
            {console.log(selectedBilon?.reports)}
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
      </Modal >
    </SafeAreaView >
  );
}
