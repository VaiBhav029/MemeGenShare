import React,{useState} from 'react'
import { Image, TouchableOpacity ,StyleSheet, View, TextInput, Alert,Text,ActivityIndicator} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';

const Upload = ({navigation}) => {

    const [cap,setCap] = useState(' ')
    const [image,setImage] = useState('')
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);


    const launchGalery = () =>{
        launchImageLibrary({},(fileobj)=>{
            console.log(fileobj.uri)
            !fileobj.didCancel 
            setImage(fileobj.uri)
        })
    }

    const uploadImage = async () => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
        setUploading(true);
        setTransferred(0);
    
        const storageRef = storage().ref(`items/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
    
          setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
              100,
          );
        });
    
        try {
          await task;
    
          const url = await storageRef.getDownloadURL();
    
          setUploading(false);
          setImage(null);
    
          // Alert.alert(
          //   'Image uploaded!',
          //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
          // );
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
      };
        const submitPost = async () => {
            const imageUrl = await uploadImage();
            console.log('Image Url: ', imageUrl);
            console.log('Post: ', cap);

            firestore()
            .collection('fav')
            .add({
            name:cap,
            url: imageUrl,
            })
            .then(() => {
            console.log('Post Added!');
            Alert.alert(
                'Post published!',
                'Your post has been published Successfully!',
            );
            navigation.goBack()
            setCap(null);
            })
            .catch((error) => {
            console.log('Something went wrong with added post to firestore.', error);
            });
        }
            

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>  
            {image ? (
            <TouchableOpacity activeOpacity={0.3} onPress={launchGalery}>
                 <Image source={{uri:image}} style={{width:300,height:250,marginVertical:20}} />
             </TouchableOpacity>               
                
            ):
                <TouchableOpacity activeOpacity={0.3} onPress={launchGalery}>
                    <Ionicons name='images-outline' size={250} color='#fff'/>
                </TouchableOpacity>
            }

            <View style={{alignItems:'center'}}>
            <TextInput style={{backgroundColor:'#fff',color:'#000',width:280,borderRadius:20,padding:15}}
            placeholder='Add Some Captiom'
            value={cap}
            mode='outlined'
            onChangeText={text => setCap(text)}
            />
            {uploading ? (
            <View style={{marginVertical:10}}>
                <Text>{transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#EE5A24" />
            </View>
            ) : (
            <TouchableOpacity  onPress={submitPost} activeOpacity={0.3} style={style.enable}>
                <Ionicons name='chevron-up-outline' size={30} color='#fff'/>
            </TouchableOpacity>
            )}

            </View>
        </View>
    )
}
const style = StyleSheet.create({
    img:{
        flex:1,
        resizeMode:'contain',
        height:450,
        width:350,
    },
    enable:{
        marginVertical:20,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'#EE5A24',
        borderRadius:10,
        height:50,
        width:50,  
    },
})
export default Upload
