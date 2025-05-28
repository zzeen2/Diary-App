import React from 'react'
import { Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    button: {
        paddingRight : 5            
    },
    backBtn : {
        width : 31,
        height : 24
    }
})

const SearchButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress = {onPress} style = {styles.button} resizeMode="contain">
            <Image source={require('../../../assets/search_more.png')} style={styles.backBtn}/>
        </TouchableOpacity>
    )
}

export default SearchButton
