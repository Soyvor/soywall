import { View, Text, Pressable, StatusBar, Dimensions, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import Categories from '../../components/categories';
import { apiCall } from '../../api';


// Utility functions for responsive design
const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * percentage) / 100;
const hp = (percentage) => (height * percentage) / 100;

const HomeScreen = () => {
  const { top } = useSafeAreaFrame();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory]= useState(null);
  const handleChangeCategory = (cat)=> {
    setActiveCategory(cat);
  }
  const searchInputRef = useRef(null);

  console.log('active category: ', activeCategory);



  useEffect(()=>{
    fetchImages();
  },[]);

  const fetchImages = async (params={page: 1}, append=true)=>{
    let res=await apiCall(params);
    console.log('response: ', res);
  }
  
  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>
            Pixels
          </Text>
        </Pressable>
        <Pressable>
          <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name='search' size={24} color={theme.colors.neutral(0.4)} />
          </View>
          <TextInput
            placeholder='Search for images...'
            value={search}
            ref={searchInputRef}
            onChangeText={value => setSearch(value)}
            style={styles.searchInput}
          />
          {search && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
            </Pressable>
          )}
        </View>
        {/*Catgories*/}
        <View style={styles.categories}>
            < Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    padding: 6,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    borderColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    fontSize: hp(1.8),
    paddingVertical: 10,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  }
});

export default HomeScreen;
