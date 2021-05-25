import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import DisplayImage from './DisplayScreen'
import ListImages from './ListImages';


import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator(); 


const HomeScreen =() =>{

    return(
        <>
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor='#EE5A24' />
            <Stack.Navigator>
                <Stack.Screen name="Meme Templates" component={ListImages} 
                options={{headerStyle:{
                    backgroundColor: '#EE5A24',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize:20,
                  fontWeight: '100',

                },
                }} />
                <Stack.Screen name="Display" component={DisplayImage}                 
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
export default HomeScreen
