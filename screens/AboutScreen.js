import React from 'react'
import {Text, View, StyleSheet,Image}from 'react-native'
const Stack = createStackNavigator(); 
import { createStackNavigator } from '@react-navigation/stack';
import Social from '../component/Social'
const AboutScreen = () => {

    const renderAbout = () =>{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                <Image source={require('../asset/avatar.png')} 
                style={style.image}/>
                
                <Text style={style.mainText}> dev : |</Text>
                <Text style={style.smallText} >Vaibhav Shetty</Text>
                <Text style={style.mainText}> api : |</Text>
                <Text style={style.smallText} >Imgflip.com/api</Text>
                <Text style={style.mainText}> framework : |</Text>
                <Text style={style.smallText} >React Native</Text>
                <Text style={style.mainText}> database : |</Text>
                <Text style={style.smallText}>firebase</Text>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',width:350}}>
                    <Social url='https://instagram.com/shetty_vaibhav7?utm_medium=copy_link' icon='logo-instagram' color='#eb4d4b'/>
                    <Social url='https://twitter.com/Vaibhav22722605' icon='logo-twitter' color='#00acee'/>
                    <Social url='https://www.linkedin.com/in/vaibhav-shetty-3793aa201/' icon='logo-linkedin' color='#0e76e8'/>
                    <Social url='https://github.com/VaiBhav029' icon='logo-github' color='#000'/>
                </View>
                
            </View>
        )
    }
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="About" component={renderAbout} 
                options={{headerStyle:{
                    backgroundColor: '#EE5A24',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize:20,
                  fontWeight: '100',

                },
                }} />
            </Stack.Navigator>
        </>
    )
}
const style = StyleSheet.create({
    image:{
        flex:1,
        width:200,
        height:200,
        borderRadius:150
    },
    mainText:{
        fontSize:22,
        fontWeight:'bold',
        color:'grey'
    },
    smallText:{
        fontSize:15,
        fontWeight:'bold',
        margin:5
    }
})
export default AboutScreen
