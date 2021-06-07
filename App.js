import React, { useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'

const App = () => {

  useEffect(() => {

      let timesRun = 0
      let interval = setInterval(function(){
      timesRun += 1
      if(timesRun === 20){
          clearInterval(interval)
      }
      console.log('aloha...', timesRun)
      flipAnimation()
    }, 200)
  
  }, [])

  let animatedValue = new Animated.Value(0)
  let currentValue = 0

  animatedValue.addListener(({value}) => {
    currentValue = value
  })

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate}]
  }

  const flipAnimation = () => {
    if(currentValue >= 90){
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: false
      }).start()
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        useNativeDriver: false
      }).start()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GIF</Text>
      <Animated.Image 
        source={{uri: 'https://cdn.pixabay.com/photo/2020/04/06/13/37/coffee-5009730_1280.png'}}
        style={[rotateYAnimatedStyle, styles.imageStyle]}
      />
      <TouchableOpacity style={styles.buttonFlip} onPress={flipAnimation}>
        <Text style={styles.title}>Flip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  title: {
    color: '#FFF',
    fontSize: 22,
  },
  imageStyle: {
    borderRadius: 6,
    resizeMode: 'contain',
    width: 250,
    height: 200,
  },
  buttonFlip: {
    marginVertical: 20,
    borderColor: '#eda',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 10,
  },
})

export default App
