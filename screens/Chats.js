import { View, TouchableOpacity } from 'react-native';
import { useState, useCallback, useEffect, useRef } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import db from '../firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const Chat = ({ navigation }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const route = useRoute();
  const chatID = route.params.id < route.params.data ? route.params.id + "_" + route.params.data : route.params.data + "_" + route.params.id;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    const subscriber = db.collection("chats").doc(chatID).collection('messages').orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const allMessages = snapshot.docs.map(item => {
          const data = item.data();
          return {
            ...data,
            _id: item.id,
            createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(),
            user: {
              _id: data.sendBy,
            },
          };
        });
        setMessagesList(allMessages);
      });
    return () => subscriber();
  }, []);

  const uploadImage = async (base64) => {
    const ref = firebase.storage().ref().child(`images/${Math.random().toString(36).substr(2, 9)}.jpg`);
    await ref.putString(base64, 'data_url');
    const downloadURL = await ref.getDownloadURL();
    return downloadURL;
  };

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      _id: Math.random().toString(36).substring(7),
      sendBy: route.params.id,
      sendTo: route.params.data,
      createdAt: new Date(),
      messageType: 'text',
    };

    if (msg.image) {
      const imageURL = await uploadImage(msg.image.split(',')[1]);
      myMsg.messageType = 'image';
      myMsg.image = imageURL;
    }

    setMessagesList(previousMessages => GiftedChat.append(previousMessages, myMsg));

    db.collection("chats").doc(chatID).collection('messages').add({
      ...myMsg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = `data:image/jpg;base64,${data.base64}`;
      onSend([{ image: source }]);
      setShowCamera(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showCamera && hasPermission === true ? (
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36 }}>
            <TouchableOpacity onPress={takePicture} style={{ alignSelf: 'center', backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
              <MaterialIcons name="camera-alt" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <GiftedChat
          messages={messagesList}
          onSend={messages => onSend(messages)}
          renderSend={(props) => {
            return (
              <TouchableOpacity onPress={() => props.onSend({ text: props.text.trim() }, true)}>
                <MaterialIcons name="send" size={24} color="blue" style={{marginBottom: 5, marginRight: 10}} />
              </TouchableOpacity>
            );
          }}
          renderActions={() => (
            <TouchableOpacity onPress={() => setShowCamera(true)} style={{marginLeft: 10}}>
              <MaterialIcons name="photo-camera" size={24} color="black" />
            </TouchableOpacity>
          )}
          user={{
            _id: firebase.auth().currentUser.uid,
          }}
        />
      )}
    </View>
  );
}

export default Chat;
