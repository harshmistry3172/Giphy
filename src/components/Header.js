// src/components/CustomHeader.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomHeader = ({ title, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.emptySpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#6200ea', // Header background color
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySpace: {
    width: 50, // Space on the right side (for balance)
  },
});

export default CustomHeader;
