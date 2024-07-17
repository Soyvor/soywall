import { View, Text, Pressable, StatusBar, Dimensions, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import {debounce} from 'lodash'
import FiltersModal from '../../components/filtersModal'


var page = 1;
// Utility functions for responsive design
const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * percentage) / 100;
const hp = (percentage) => (height * percentage) / 100;

const HomeScreen = () => {
  const { top } = useSafeAreaFrame();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory]= useState(null);
  const handleChangeCategory = (cat)=> {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page=1;
    let params={
      page,
    }
    if(cat)params.category=cat;
    fetchImages(params, false);
  }

  const handlesearch = (text)=>{
    setSearch(text);
    if(text.length>2){
      page=1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({page,q:text}, false);
    }
    if(text=="")
    {
      page=1;
      searchInputRef?.current.clear();
      setImages([]);
      setActiveCategory(null);
      fetchImages({page},false);
    }
  }
  const clearSearch=()=>{
    setSearch('');
    searchInputRef?.current.clear();
  }
  const handleTextDebounce = useCallback(debounce(handlesearch, 400), []);

  const searchInputRef = useRef(null);

  const modalRef = useRef(null);

  console.log('active category: ', activeCategory);

  useEffect(()=>{
    fetchImages();
  },[]);

  const fetchImages = async (params={page: 1}, append=false)=>{
    console.log('parameters',params,append);
    let res=await apiCall(params);
    if(res.success && res?.data?.hits){
      if(append)
       setImages([...images,...res.data.hits])
      else
       setImages([...res.data.hits])
    }
  }

  const openFiltersModal=()=>{
    modalRef?.current?.present();
  }
  const closeFiltersModal = () => {
    modalRef?.current?.close();
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>
            Pixels
          </Text>
        </Pressable>
        <Pressable onPress={openFiltersModal}>
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
            
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            style={styles.searchInput}
          />
          {search && (
            <Pressable onPress={()=> handlesearch("")}style={styles.closeIcon}>
              <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
            </Pressable>
          )}
        </View>
        {/*Catgories*/}
        <View style={styles.categories}>
            < Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
        </View>
        {/*Images*/}
        <View>
          {
            images.length>0 && <ImageGrid images={images}/>
          }
        </View>
      </ScrollView>
      {/*filters modal*/}
      <FiltersModal modalRef={modalRef}/>
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
