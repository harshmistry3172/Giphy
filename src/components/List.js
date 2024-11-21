import React from 'react';
import { FlatList, TouchableOpacity, Text, View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const GIFList = ({
  gifs,
  handleGifPress,
  handleDownload,
  handleShare,
  downloadProgress,
  fetchMoreGifs,
  loading,
  searchTerm,
  styles
}) => {
  return (
    <FlatList
      data={gifs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleGifPress(item.id)}>
          <FastImage
            style={styles.image}
            source={{
              uri: item.images.fixed_width.url,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownload(item.images.fixed_width.url, item.id)}
              disabled={downloadProgress[item.id] !== undefined} // Disable button if download is in progress
            >
              <Text style={styles.downloadText}>
                {downloadProgress[item.id] !== undefined
                  ? `${Math.round(downloadProgress[item.id])}%`
                  : 'Download'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(item.images.fixed_width.url, item.id)}
              disabled={downloadProgress[item.id] !== undefined} // Disable button if download is in progress
            >
              <Image
                style={styles.shareImage}
                source={require('../../assets/share.png')}
                resizeMode={FastImage.resizeMode.center}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      numColumns={2} // Set number of columns to 2 for grid layout
      onEndReached={fetchMoreGifs}
      onEndReachedThreshold={0.5} // Trigger lazy load when 50% from bottom
      ListFooterComponent={loading && searchTerm.length === 0 && <ActivityIndicator size="large" color="#0000ff" />}
    />
  );
};

export default GIFList;
