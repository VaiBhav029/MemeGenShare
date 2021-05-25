import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Social = ({url,icon,color}) => {
    return (
        <>
            <TouchableOpacity onPress={()=>Linking.openURL(url)}>
                <Ionicons name={icon}  color={color} size={40}/>
            </TouchableOpacity>
        </>
    )
}

export default Social
