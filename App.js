 
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
   View,
  Text,
  StatusBar,
  Dimensions, 
  Animated
} from 'react-native';

import dayjs from 'dayjs'

 const {width} = Dimensions.get('screen');
 const SIZE = width * 0.9;
 const TICK_INTERVAL = 1000;

 export default class app extends React.Component {
      state ={
        index : new Animated.Value(0),
        tic : new Animated.Value(0),
        scales: [...Array(6).keys()].map(() => new Animated.Value(0))
      }

    _timer = 0;
    _ticker = null;

    componentDidMount () {
      const current = dayjs();
      const diff  = current.endOf('day').diff(current, 'second');
      const oneDay = 24 * 60 * 60;

      this._timer = oneDay - diff;
      this.state.tic.setValue(this._timer);
      this.state.index.setValue(this._timer - 30)

      this._animate();

      this._ticker = setInterval(() => {
        this._timer += 1;
        this.state.tic.setValue(this._timer);
      }, TICK_INTERVAL)
    }

    componentWillUnmount(){
      clearInterval(this._ticker);
      this._ticker = null;
    }

    _animate = () => {
      const scalesStiggerAnimations = this.state.scales.map(animated => {
        return Animated.spring(animated, {
          toValue: 1,
          tension: 18,
          friction: 3,
          useNativeDriver: true
        });
      });

      Animated.parallel([
        Animated.stagger(TICK_INTERVAL / this.state.scales.length, scalesStiggerAnimations),
        Animated.timing(this.state.index,{
          toValue: this.state.tic,
          duration: TICK_INTERVAL / 2,
          useNativeDriver: true
        })
      ]).start()
      
    }
  render(){
   const {index,
     scales:[
       smallQuadranScale,
       mediumQuadranScale,
       bigQuadranScale,
       secondsScale, 
       minutesScale,
       hoursScale
  ]} = this.state; 
   const interpolated = {
     inputRange: [0, 360],
     outputRange: ['0deg', '360deg']
   }
   const secondDegrees = Animated.multiply(index, 6)
  //  const rotateSeconds = '25deg';
   const transformSeconds = {
     transform : [{rotate: secondDegrees.interpolate(interpolated)}, {scale: secondsScale}]
   };

   const rotateMinutes = Animated.divide(secondDegrees, new Animated.Value(60));
   const transformMinutes = {
     transform : [{rotate: rotateMinutes.interpolate(interpolated)}, {scale: minutesScale}]
   };

   const rotateHours = Animated.divide(rotateMinutes, new Animated.Value(12));
   const transformHours = {
     transform : [{rotate: rotateHours.interpolate(interpolated)}, {scale: hoursScale}]
   };

  return (
    <>
    <StatusBar hidden={true} />
      {/* 
      <SafeAreaView> */}
             <Animated.View style={[styles.bigQuadran, {transform: [{scale: bigQuadranScale}]}]} />
             <Animated.View style={[styles.mediumQuadran, {transform:[{scale: mediumQuadranScale}]}]} />
 
           <View style={styles.container}>   

               <Animated.View style={[styles.mover,transformHours]}>
                  <View style={styles.hours} />
               </Animated.View>

               <Animated.View style={[styles.mover, transformMinutes]}>
                  <View style={styles.minutes} />
               </Animated.View>

               <Animated.View style={[styles.mover, transformSeconds]}>
                  <View style={styles.seconds} />
               </Animated.View>
        <Animated.View style={[styles.smallQuadran, {transform: [{scale: smallQuadranScale}]}]} />

           </View>
            
       {/* </SafeAreaView> */}
    </>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex:1,
     backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',    
  },
  mover:{
    position: 'absolute',
    // elevation:6,
    height: SIZE,
    width: SIZE,  
    alignItems:'center',
    justifyContent:'flex-start',
 
 
  },
  hours:{
    backgroundColor: 'rgba(0,40,0,0.7)',
    height: '35%',
    marginTop: '15%',
    width:4,
    borderRadius: 4,
    // position: 'absolute',
    // elevation:3
//  zIndex: 6
  },
  minutes:{
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '45%',
    marginTop: '5%',
    width:4,
    borderRadius: 3 ,
    // position: 'absolute',
    // elevation:3
  },
  seconds:{
    backgroundColor: 'rgba(227,71,134,1)',
    height: '50%',
    width:2,
    borderRadius: 2,
    // position: 'absolute',
    //  elevation:3
  },
  bigQuadran:{
    height: SIZE * 0.8,
    width: SIZE * 0.8,
    borderRadius: SIZE* 0.4 ,
    backgroundColor: 'rgba(200,200,200,0.2)', 
    top:SIZE/2   ,
    left:SIZE/2 - 130,
    position:'absolute',
    elevation:1,
  },
  mediumQuadran:{
    // height: SIZE * 0.5,
    // width: SIZE * 0.5,
    borderRadius: SIZE * 0.7,

    height:200,
    width:200,
     backgroundColor: 'rgba(200,200,200,0.3)',
     top:SIZE/2 + 50 ,
     left:SIZE/2 - 80 ,
     position:'absolute',
    elevation:2,
    
  },
  smallQuadran:{
    width: 10,
    height:10,
    borderRadius:5,
    backgroundColor: 'rgba(227,71,134,1)',
    top:SIZE - 35,
    left:SIZE/2 + 15 ,
    position:'absolute',
    // elevation:1
  }

  
});

 