import { StyleSheet, Text, TouchableWithoutFeedback,
  View,
   Image,
   Modal
  } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../config/colors'
import plus from '../../../assets/plus.png';
import * as DocumentPicker from 'expo-document-picker';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable} from "firebase/storage";
import Screen from '../../../components/Screen';
import AppButton from '../../../components/AppButton';


export default function AddSong() {

  //Bring Out the modal 
  const [modalVisible, setModalVisible] = useState(false);
// This Function handle the selection of the song
    async function selectAudioFile() {

        try {
          const audioFile = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
          });
          

         if( audioFile && audioFile.name){
          
          setModalVisible(true)
           uploadAudioFile(audioFile) 
        }else{
          console.error('Invalid audio file');
        } 
         
        } catch (error) {
          console.log(error);
        }
      }

// Function to handle file upload to firebase
async function uploadAudioFile(audioFile) {
  // Get the current user's id
  const userId = getAuth().currentUser.uid;
  console.log(userId);
  
  // Create a storage reference for the audio file
  const storage = getStorage();
  const storageRef = ref(storage, `userSongs/${userId}/${audioFile.name}`);

  // Fetch the audio file data as a blob
  const response = await fetch(audioFile.uri);
  const blob = await response.blob();

  // Create file metadata including the content type
  const metadata = {
    contentType: audioFile.type,
  };

  // Upload the file and metadata
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
 

  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
  }, (error) => {
    // Handle upload error
    console.log(error);
  }, () => {
    // Upload completed successfully
    console.log('Upload completed successfully');
  });


}


  return (
    <Screen style={{marginTop:-12}}>
        <View style={styles.headerView}>
        <Text style={styles.mainText}>Upload your music to Soundnix</Text>
        </View>
        <View  style={styles.uploadView}>
        <TouchableWithoutFeedback onPress={selectAudioFile}>
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

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContent}>
         <View style={styles.modalView}>  
         </View>
          <AppButton title="close"
           style={styles.modalButton} 
           color="white"
           styleText={{color:colors.white,fontSize:16}}
           onPress={() => setModalVisible(false)}
           />
      
        </View>
      </Modal>
        </View>
    </Screen>
 
    
  )
}

const styles = StyleSheet.create({
    mainText:{
        color:colors.light,
        alignItems:"center",
        fontSize:23,
        fontWeight:"bold",
        
      },
    headerView:{
        alignItems:"center",
    },
    uploadView:{
        alignItems:"center",
    }
    ,
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
  
  modalContent: {
    marginTop:40,
    height:350,
    weight:300,
    borderRadius:5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    margin: 20,
  },

  modalButton:{
    height:50,
    backgroundColor:colors.black,
    borderRadius:5,
  },
  modalView:{
    margin:15,
    marginLeft:-2,
    marginRight:-2,
    height:170,
    borderRadius:5,
    backgroundColor:colors.black,
    
  }
    

})