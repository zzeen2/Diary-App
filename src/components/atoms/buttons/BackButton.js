import React from 'react'
import { Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    button: {
        paddingRight : 14            
    },
    backBtn : {
        width : 24,
        height : 24
    }
})

const BackButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress = {onPress} style = {styles.button} resizeMode="contain">
            <Image source={require('../../../assets/backBtn.png')} style={styles.backBtn}/>
        </TouchableOpacity>
    )
}

export default BackButton
