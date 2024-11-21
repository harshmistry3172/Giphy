import React, { useState, useEffect } from 'react';
import { TextInput , View, ActivityIndicator, Switch } from 'react-native';
import axios from 'axios';
import { getCachedData, cacheData } from '../utils/cache';
import RNFS from 'react-native-fs';  // Import react-native-fs for file handling
import Toast from 'react-native-toast-message';  // Import react-native-toast-message
import Share from 'react-native-share';
import CustomHeader from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { getStyles } from './HomeScreenStyle'; // Path to the style file
import GIFList from '../components/List';


const API_KEY = 'wEcCppO3UaWkO4ITrPBChvkxlgBBtbEk';  // Replace with your Giphy API key
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';

const HomeScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(isDarkMode); // Get the appropriate styles based on the theme
  const [isSwitch, setIsSwitch] = useState(false);
  let typingTimeout = null; 

  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);  // Pagination for lazy loading
  const [playingGifId, setPlayingGifId] = useState(null);  // To store the ID of the GIF being played
  const [downloadProgress, setDownloadProgress] = useState({});  // To store download progress for each GIF

  useEffect(() => {
    if (searchTerm.length == 0) {
      fetchTrendingGifs();  // Fetch trending GIFs if no search term is provided
    } else {
      handleSearch(searchTerm);  // Handle search with debouncing
    }
  }, []);

  useEffect(() => {
    if (searchTerm == '') {
      fetchTrendingGifs();  // Fetch trending GIFs if no search term is provided
    }
  }, [searchTerm]);

  // Fetch GIFs from the Giphy API and cache the response
  const fetchGifs = async (query, offset = 0) => {
    setLoading(true);

    // Check if there is cached data
    const cachedGifs = await getCachedData(query);
    if (cachedGifs) {
      setGifs(cachedGifs);
      setLoading(false);
      return;
    }

    // Fetch new GIFs from the API
    try {
      const response = await axios.get(GIPHY_URL, {
        params: {
          api_key: API_KEY,
          q: query,
          limit: 20,
          offset: offset,
        },
      });
      setGifs(response.data.data);
      cacheData(query, response.data.data);  // Cache the result for later use
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from Giphy API:", error);
      setLoading(false);
    }
  };

  // Fetch trending GIFs from Giphy
  const fetchTrendingGifs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(GIPHY_TRENDING_URL, {
        params: {
          api_key: API_KEY,
          limit: 20,
        },
      });
      setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trending data from Giphy API:", error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    
    // Clear the previous timeout if the user keeps typing
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    typingTimeout = setTimeout(() => {
      if (text.length > 1) {
        fetchGifs(text);  // Call API when typing stops
      }
    }, 1000);  // Wait 1 second after typing stops
  };

  // Fetch more GIFs for lazy loading when the user scrolls to the end
  const fetchMoreGifs = async () => {
    if (loading) return;  // Prevent loading more GIFs if already loading

    setLoading(true);
    if (searchTerm.length > 0) {
      // Fetch more GIFs based on search term
      try {
        const response = await axios.get(GIPHY_URL, {
          params: {
            api_key: API_KEY,
            q: searchTerm,
            limit: 20,
            offset: page * 20,
          },
        });
        setGifs((prevGifs) => [...prevGifs, ...response.data.data]);
        setPage((prevPage) => prevPage + 1);  // Increment the page number for pagination
      } catch (error) {
        console.error("Error fetching more data:", error);
      }
    } else {
      // Fetch more trending GIFs if no search term is provided
      try {
        const response = await axios.get(GIPHY_TRENDING_URL, {
          params: {
            api_key: API_KEY,
            limit: 20,
            offset: page * 20,
          },
        });
        setGifs((prevGifs) => [...prevGifs, ...response.data.data]);
        setPage((prevPage) => prevPage + 1);  // Increment the page number for pagination
      } catch (error) {
        console.error("Error fetching more trending data:", error);
      }
    }
    setLoading(false);
  };

  // Play/Pause GIF handler
  const handleGifPress = (gifId) => {
    if (playingGifId === gifId) {
      // If the GIF is already playing, pause it
      setPlayingGifId(null);
    } else {
      // Otherwise, play the clicked GIF
      setPlayingGifId(gifId);
    }
  };

  // Download GIF handler with progress
  const handleDownload = async (url, gifId) => {
    const filePath = `${RNFS.DownloadDirectoryPath}/${gifId}.gif`;  // Define file path
    try {
      const download = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        progress: (res) => {
          const progressPercentage = (res.bytesWritten / res.contentLength) * 100;
          setDownloadProgress((prev) => ({
            ...prev,
            [gifId]: progressPercentage,
          }));
        },
      });

      const result = await download.promise;
      if (result.statusCode === 200) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Download Successful',
          text2: `GIF has been downloaded in Download.`,
        });
        setDownloadProgress((prev) => {
          const updatedProgress = { ...prev };
          delete updatedProgress[gifId]; // Remove progress when download is complete
          return updatedProgress;
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Download Failed',
          text2: 'There was an error downloading the GIF.',
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Download Failed',
        text2: 'There was an error downloading the GIF.',
      });
    }
  };

  const handleShare = async (url, gifId) => {
    const filePath = `${RNFS.DownloadDirectoryPath}/${gifId}.gif`;
    
    // First, download the GIF to local storage
    try {
      const download = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
      });

      const result = await download.promise;
      if (result.statusCode === 200) {
        const shareOptions = {
          title: 'Share GIF',
          url: `file://${filePath}`,  // Share the local file path
          type: 'image/gif',  // Ensure the file type is GIF
        };
        
        // Open the native share dialog
        Share.open(shareOptions)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Share Failed',
          text2: 'There was an error downloading the GIF.',
        });
      }
    } catch (error) {
      console.error("Error sharing GIF:", error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Share Failed',
        text2: 'There was an error downloading or sharing the GIF.',
      });
    }
  };

  return (
    // <CustomHeader title={'Giphy'}/>,
    <View style={styles.container}>
        <View style= {styles.headerBar}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search GIFs..."
        onChangeText={setSearchTerm}
        placeholderTextColor={isDarkMode ? '#fff' : '#000'}
        onEndEditing={() => handleSearch(searchTerm)}
      />
      <View style={styles.toggleContainer}>
        {/* <Text style={styles.toggleLabel}>Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</Text> */}
        <Switch
          value={isSwitch}
          onValueChange={(value) => {
            setIsSwitch(value)
            toggleTheme(!isDarkMode)
        }
    }
        />
      </View>
      </View>
      {/* Loading Indicator */}
      {loading && searchTerm.length > 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <GIFList
        gifs={gifs}
        handleGifPress={handleGifPress}
        handleDownload={handleDownload}
        handleShare={handleShare}
        downloadProgress={downloadProgress}
        fetchMoreGifs={fetchMoreGifs}
        loading={loading}
        searchTerm={searchTerm}
        styles={styles}
      />
      )}
    </View>
    

  );
};
export default HomeScreen;
