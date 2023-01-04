import { 
    StyleSheet, 
    Text,
     TouchableWithoutFeedback, 
     View,
     Image
     } from 'react-native'
import React from 'react'
import plus from '../../assets/plus.png';
import colors from '../../config/colors';

function UploadSongButton({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.uploadButton}>
    <View style={styles.styleUploadButtonView}>
  <Image 
    source={plus} 
    style={{
      width: 22,
      height: 22,
      tintColor: colors.black,
    }}
  />
</View>
 <Text style={{color:colors.white,fontWeight:"bold"}}>Tab here and browse to your file</Text>
    </View>
</TouchableWithoutFeedback>
  )
}

export default UploadSongButton;
const styles = StyleSheet.create({
    uploadButton:{
        width:300,
        height:200,
        marginTop:25,
        borderWidth:2,
        borderStyle:'dashed',
        borderColor:colors.light,
        justifyContent:"center",
        alignItems:"center"
       },

 styleUploadButtonView:
  {
    width: 60,
    height: 60,
    backgroundColor: colors.brandColor,
    borderRadius: 90*0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.brandColor,
    borderWidth:2,
    marginBottom: Platform.OS == "android" ? 50 : 30
  },
})