const lightTheme = {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff', // Light theme background color
    },
    headerBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
      },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      backgroundColor: '#fff', // Light background for input
      color: '#000', // Dark text for light theme
      width:"85%"
    },
    card: {
      flex: 1,
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#fff', // Light background for card
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 200,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    downloadButton: {
      padding: 10,
      backgroundColor: '#007bff', // Light theme button color
      width: '69%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shareButton: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50', // Light theme button color
    },
    shareImage: {
      width: '40%',
      height: '40%',
      tintColor: '#fff',
    },
    downloadText: {
      color: 'white',
      fontSize: 16,
      alignSelf: 'center',
    },
  };
  
  const darkTheme = {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#333', // Dark theme background color
    },
    headerBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      backgroundColor: '#000', // Light background for input
      color: '#fff', // Dark text for light theme
      width:"85%"
    },
    card: {
      flex: 1,
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#444', // Dark background for card
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 200,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    downloadButton: {
      padding: 10,
      backgroundColor: '#007bff', // Light theme button color
      width: '69%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shareButton: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50', // Dark theme button color
    },
    shareImage: {
      width: '40%',
      height: '40%',
      tintColor: '#fff',
    },
    downloadText: {
      color: 'white',
      fontSize: 16,
      alignSelf: 'center',
    },
  };
  
  // Function to return styles based on theme
  export const getStyles = (isDarkMode) => {
    return isDarkMode ? darkTheme : lightTheme;
  };