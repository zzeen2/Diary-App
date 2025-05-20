import React from 'react'
import { Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    button: {
        paddingLeft: 8,            
    },
    okBtn : {
        width : 30,
        height : 32
    }
})

const ConfirmButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress = {onPress} style = {styles.button} resizeMode="contain">
            <Image source={require('../../assets/okBtn2.png')} style={styles.okBtn}/>
        </TouchableOpacity>
    )
}

export default ConfirmButton