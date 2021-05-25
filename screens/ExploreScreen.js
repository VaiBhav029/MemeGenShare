import React, { useState,useEffect } from 'react'
import {FlatList,TouchableOpacity,StyleSheet, View, ActivityIndicator}from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Card from '../component/Card'
import { createStackNavigator } from '@react-navigation/stack';
import DisplayUploaded from './DisplayUploaded'

const Stack = createStackNavigator(); 

import Ionicons from 'react-native-vector-icons/Ionicons';
import Upload from './Upload';
import Loader from '../component/Loader';
const ExploreScreen = ({navigation}) => {

    const ListImages = () =>{
      const [items,setItem] = useState([])
      const [loading,setLoading] = useState(true)

      const getDetails = async () =>{
          try{
            const querysnap = await firestore().collection('fav').get()
            const result = await querysnap.docs.map(docsnap => docsnap.data())
            setItem(result)
            setLoading(false)
            console.log(result)
          }
          catch(e){
            console.log(e)
          }
        }
        useEffect(() => {
          getDetails()
        }, [])
      return(
        <>
        {loading ? <ActivityIndicator size='large' color='#EE5A24' />:(
                            <FlatList 
                            keyExtractor={items => items.url}
                            data={items}
                            numColumns={2}
                            renderItem={({item})=>(
                            <TouchableOpacity onPress={() => navigation.navigate('DisplayUploaded',{name:item.name,url:item.url})}
                            >
                            <Card it={item} />
                            </TouchableOpacity>
                            )} />
        )}
        </>
      )
  }
    return (
      <>
          <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="Memes" component={ListImages} 
                options={{headerStyle:{
                    backgroundColor: '#EE5A24',
                    
                },
                headerRight: () => (
              <TouchableOpacity style={{marginRight:15}} onPress={()=>navigation.navigate('Upload')}>
                <Ionicons name='add-outline' size={35} color='#fff' />
              </TouchableOpacity>
                ),
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize:20,
                  fontWeight: '100',

                },
                }} />
                <Stack.Screen name="DisplayUploaded" component={DisplayUploaded}                 
                options={({ route }) => ({ 
                    title: route.params.name, 
                    headerStyle:{
                    backgroundColor: '#EE5A24',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize:20,
                  fontWeight: '100',
                },
                })} />
                <Stack.Screen name="Upload" component={Upload}                 
                options={{  
                    headerStyle:{
                    backgroundColor: '#EE5A24',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize:20,
                  fontWeight: '100',
                },
                }} />
            </Stack.Navigator>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#eefe',
  },
});
export default ExploreScreen
