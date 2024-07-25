import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from './Data';
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item})=>
        <View>
          <Text>{item.rating}</Text>
          <Image style={styles.Name}source={{uri:item.image}}/>
          </View>
         }
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  Name:{
    height:200,
    width:200
  }
});
