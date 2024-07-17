import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import {theme} from '../constants/theme'
import { getImageSize, wp } from '../helpers/commons';
const ImageCard = ({ item, index, Columns }) => {
  
  const isLastInRow = ()=>{
    return (index+1)%Columns===0;
  }

  const getImageHeight = () => {
    let {imageHeight: height, imageWidth: width} = item;
    return {height:getImageSize(height, width)};
  }

  return (
    <Pressable style={[styles.imageWrapper,!isLastInRow()&&styles.spacing]}>
      <Image
         style={[styles.image, getImageHeight()]}
         source={item?.webformatURL }
         transition={400}
      />
    </Pressable>
  )
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  imageWrapper:{
    backgroundColor:theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve:'continuous',
    overflow:'hidden',
    marginBottom:wp(2),
  },
  spacing:{
    marginRight:wp(2),
  }
});

export default ImageCard;
