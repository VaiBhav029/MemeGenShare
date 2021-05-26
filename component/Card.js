import React from 'react'
import {StyleSheet,Dimensions,View,Text,Image} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Card = ({it}) => {
    return (
        <>  
            <View style={styles.box}> 
                <Image  source={{uri:it.url}} style={{height:windowHeight/2,width:windowWidth/2,borderRadius:15}} />
                <View>
                    <Text style={styles.text} >{it.name} </Text>
                </View>
            </View>
           
        </>
    )
}
const styles = StyleSheet.create({
    box:{
    height:windowHeight/2,
    width:windowWidth/2, 
    marginTop:5,
    marginEnd:5,
    marginBottom:14,
    backgroundColor:'#eee'

    
  },
  text:{
    textAlign:'center',
    color:'black',
    fontSize:12,
    fontWeight:'700'
  },

})
export default Card
