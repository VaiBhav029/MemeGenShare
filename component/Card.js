import React from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'

const Card = ({it}) => {
    return (
        <>  
            <View style={styles.box}> 
                <Image  source={{uri:it.url}} style={{height:300,width:170,borderRadius:5}} />
                <View style={{}} >
                    <Text style={styles.text} >{it.name} </Text>
                </View>
            </View>
           
        </>
    )
}
const styles = StyleSheet.create({
    box:{
    height:300,
    width:170, 
    margin:5,
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
