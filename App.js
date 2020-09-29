 
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
   View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';

 const {width} = Dimensions.get('screen');
 const SIZE = width * 0.9;

 export default function App() {
  return (
    <>
      {/* <StatusBar hidden barStyle="dark-content" />
      <SafeAreaView> */}
             <View style={[styles.bigQuadran]} />
        <View style={[styles.mediumQuadran]} />
        <View style={[styles.smallQuadran]} />
 
           <View style={styles.container}>   

               <View style={[styles.mover, {elevation:0, position:'absolute'}]}>
                  <View style={styles.hours} />
               </View>

               <View style={styles.mover}>
                  <View style={styles.minutes} />
               </View>

               <View style={styles.mover}>
                  <View style={styles.seconds} />
               </View>
           </View>
            
       {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
     backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',    
  },
  mover:{
    position: 'absolute',
    height: SIZE,
    width: SIZE,  
    alignItems:'center',
    // justifyContent:'flex-start',
    // left:0,

 
  },
  hours:{
    position: 'absolute',
    backgroundColor: 'rgba(0,40,0,0.4)',
    height: '35%',
    marginTop: '15%',
    width:4,
    borderRadius: 4,
    // elevation:2
 
  },
  minutes:{
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '45%',
    marginTop: '5%',
    width:4,
    borderRadius: 3 ,
  // elevation:2
  },
  seconds:{
    position: 'absolute',
    backgroundColor: 'rgba(227,71,134,1)',
    height: '50%',
    width:2,
    borderRadius: 2,
    //  elevation:2
  },
  bigQuadran:{
    height: SIZE * 0.8,
    width: SIZE * 0.8,
    borderRadius: SIZE* 0.4 ,
    backgroundColor: 'rgba(200,200,200,0.2)', 
    position:'absolute',
     top:SIZE/2   ,
    left:SIZE/2 - 130,
    elevation:10,
  },
  mediumQuadran:{
    height: SIZE * 0.5,
    width: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200,200,200,0.5)',
    position:'absolute',
 
    top:SIZE/2 + 65 ,
    left:SIZE/2 - 70 ,
    elevation:15,
    
  },
  smallQuadran:{
    position:'absolute',
    width: 10,
    height:10,
    borderRadius:5,
    backgroundColor: 'rgba(227,71,134,1)',
    top:SIZE,
    left:SIZE/2 + 15,
    elevation:30
  }

  
});

 