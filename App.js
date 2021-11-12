import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function App() {
  const [hasPermission ,setHasPermission] = useState(null)
  const [scanned , setScanned] = useState(false)
  const [text, setText] = useState('Not yet scanned')
  const askForCameraPermission=()=>{
    (async ()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status=='granted')
    })()
  }
  useEffect(()=>{
    askForCameraPermission();
  },[])

  const handleBarcodeScanner=({type,data})=>{
     setScanned(true)
     setText('Type: '+ type + '\n Data : '+data)
  }
  if (hasPermission==null){
      return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
                <Button title="Allow camera" onPress={()=>askForCameraPermission()}/>
                <StatusBar style="auto" />
            </View>
      )
  }
      
  
  if (hasPermission==false){
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Allow camera" onPress={()=>askForCameraPermission()}/>
        <StatusBar style="auto" />
      </View>
    );
  }
 
    return (
      <View style={styles.container}>
          <View style={styles.barcodebox}> 
                  <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined :handleBarcodeScanner}
                  style={{height:400,width:480}}/>
          </View>
          <Text>{text}</Text>
          {scanned && <Button title ="Scan egain" onPress={()=>
          setScanned(false)} color='tomato'/>}
      </View>
   );
     
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#72a46e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox : {
    alignItems : 'center',
    justifyContent: 'center',
    height : 300,
    width : 300,
    overflow: 'hidden'
  }
});
