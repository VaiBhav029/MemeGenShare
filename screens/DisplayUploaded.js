import React from 'react'
import RNFetchBlob from 'rn-fetch-blob';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    PermissionsAndroid
  } from 'react-native';

const DisplayUploaded = ({route}) =>{

  const checkPermission = async () => {
    
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
  };
  const downloadImage = () => {
    // Main function to download the image

    // Image URL which we want to download
    let image_URL = route.params.url
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          route.params.name +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res.path));
        Alert.alert('Image Downloaded Successfully.');
      }).catch(e =>{
        console.log(e)
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };

 
    return(
        <View style={styles.container}>
          <Image  source={{uri:route.params.url}} style={styles.image} />
              <TouchableOpacity style={styles.download} onPress={checkPermission} >
                  <Text style={styles.text}>Download</Text>
              </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'space-evenly',
      alignItems:'center',
      
  }
  ,
  image:{
    flex:1,
      resizeMode:'contain',
      height:450,
      width:350,
      alignItems:'center',
      marginVertical:10
  },

  download:{
      backgroundColor:'#474846',
      height:50,
      width:290,
      borderRadius:30,
      justifyContent:'center'
  },
  text:{
      fontSize:18,
      color:'white',
      textAlign:'center'
  }
})


export default DisplayUploaded