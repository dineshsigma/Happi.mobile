import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform,Text} from 'react-native';
import dings from '../assets/bgm.mp3';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableRipple } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider'
import Sound from 'react-native-sound';

const AudioPlayer = (props) => {
    const [durationSlider, setDurationSlider] = useState(0);
    const [timeSlider, setTimeSlider] = useState(0);
    const [urlAudio, setUrlAudio] = useState(props.path);
    const [isPlayer, setIsPlayer] = useState(false);
    const [player, setPlayer] = useState(new Sound('',''))

    const [playing, setPlaying] = useState();
  useEffect(() => {
        Sound.setCategory('Playback');
        const song = new Sound(urlAudio,'',error =>{
            if(error){
                console.log('error:', error);
            }
        });
        setPlayer(song)
  }, [urlAudio]);

  useEffect(()=>{
    var timerID = setInterval(()=>loadCurrentTime(),1000)
    return function cleanup(){
        clearInterval(timerID)
    }
  })
  const loadCurrentTime = useCallback(()=>{
    if(isPlayer){
        player.getCurrentTime((seconds)=>{
            setTimeSlider(seconds);
        })
    }
  },[player,isPlayer])

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', height:50, backgroundColor:'#f7f6f2', justifyContent:'center', alignItems:'center', paddingLeft:20, paddingRight:20, borderRadius:10}}>

            {!isPlayer ? (
                <>
                <TouchableRipple onPress={()=>{
                    setDurationSlider(player.getDuration());
                    setIsPlayer(!isPlayer);
                    player.play()
                }}>
                    <IconFeather name='play' style = {{color:"#000"}} size={22}/>
                    </TouchableRipple>
                </>
            ):
            (
                <>
                <TouchableRipple onPress={()=>{
                    player.pause();
                    setIsPlayer(!isPlayer);
                }}>
                    <IconFeather name="pause" size={22} style = {{color:"#000"}} />
                </TouchableRipple>
                </>
            )}
         <Text style={{color:"#000", left:5, right:5}}>0:{parseInt(timeSlider)}/0:{parseInt(durationSlider)}</Text>

            <Slider
            style={{width: 100, height: 20,left:20}}
                minimumValue={0}
                maximumValue={durationSlider}
                minimumTrackTintColor='#000'
                maximumTrackTintColor='#000'
                thumbTintColor='#000'
                value={timeSlider}
                step={1}
                onValueChange={values=>{
                    player.setCurrentTime(values);
                    setTimeSlider(values)

                }}
                />
          
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top:10,
    paddingBottom:10
    // backgroundColor: '#fff',
  },
  playBtn: {
    padding: 20,
  },
});
export default AudioPlayer;