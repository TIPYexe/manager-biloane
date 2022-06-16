import { createContext, useState, useMemo } from "react";
import { Dimensions } from 'react-native';
// import { navigate } from "../navigation/root.navigation";

const AppContext = createContext();

function AppProvider(props) {

    const ripeImg = ['https://i.ibb.co/72r7VKN/bilon0.png', 'https://i.ibb.co/wLWLrvW/bilon1.png', 'https://i.ibb.co/fkL93Fg/bilon2.png', 'https://i.ibb.co/JCVjcCR/bilon3.png', 'https://i.ibb.co/0GYyhWH/bilon4.png'];
    const reportTypes = ['Planta bolnava', 'Planta lipsa', 'Altceva'];
    const reportImg = ['https://cdn-icons-png.flaticon.com/512/6939/6939131.png', 'https://cdn-icons-png.flaticon.com/512/189/189665.png', 'https://cdn-icons-png.flaticon.com/512/7543/7543132.png'];
    const deviceW = Dimensions.get('screen').width;
    const deviceH = Dimensions.get('screen').height;

    const [selectedBilon, setSelectedBilon] = useState(null);
    const [dataBiloane, setDataBiloane] = useState([]);

    const store = {
        ripeImg,
        reportTypes,
        reportImg,
        deviceW,
        deviceH,

        selectedBilon,
        setSelectedBilon,
        dataBiloane,
        setDataBiloane,
    };

    const storeForProvider = useMemo(() => store, [store]);
    return <AppContext.Provider value={storeForProvider}>{props.children}</AppContext.Provider>;
}

export { AppContext };
export default AppProvider;