import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MasonryFlashList } from "@shopify/flash-list";
import { theme } from '../constants/theme';
import { data } from '../constants/data';
import ImageCard from './imageCard';
import { wp } from '../helpers/commons';
import { getColumnCount } from '../helpers/commons';

const ImageGrid = ({ images }) => {
  const columns = getColumnCount();
 return (
    <View style={styles.container}>
      <MasonryFlashList
          data={images}
          numColumns={columns}
          initialNumToRender={1000}
          contentContainerStyle={styles.listContainerStyle}
          renderItem={({ item, index }) => <ImageCard item={item} columns={columns} index={index} />}
          estimatedItemSize={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300, // Ensure the container has a minimum height
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;
