import React,{useEffect, useState} from 'react';
import {
    FlatList,
    TouchableOpacity,
    Alert
  } from 'react-native';
import Card from '../component/Card'
import Loader from '../component/Loader';
const ListImages = ({navigation}) =>{
    const [img,setImage] = useState([])
    const [loading,setLoading] = useState(true)
    const image = async() => {
            setTimeout(async()=>{
                try{
                    const res = await fetch('https://api.imgflip.com/get_memes')
                    const result = await res.json()
                    setImage(result.data.memes)
                    setLoading(false)
                }
                catch(e){
                    Alert.alert('Netwrok Error','Please Connect To the internet')
                }
            },2500)
            }
    useEffect(()=>{
        image()
        },[])
    return(
        <>
        {loading ? <Loader />:(
                        <FlatList
                        initialNumToRender={5}
                        data={img}
                        numColumns={2}
                        renderItem={({item})=>(
                        <TouchableOpacity onPress={() => navigation.navigate('Display',{name:item.name,url:item.url})}
                        >
                        <Card it={item} />
                        </TouchableOpacity>
                        
                    )} />
        ) }
        

    </>
    )
}
export default ListImages