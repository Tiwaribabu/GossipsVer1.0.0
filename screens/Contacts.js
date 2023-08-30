import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator,ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useRoute } from '@react-navigation/native';
import db from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function Contacts({ navigation }) {
  const id = firebase.auth().currentUser.uid;
  const [userC, setUserC] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [error, setError] = useState(null);
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
    setIsLoading(true);
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color='#064663' />
      </View>
    );
  }

  const getUsers = async () => {
    await db.collection("users").where("uid", "!=", firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
      var allU = [];
      snapshot.docs.map((doc) => {
        var user = doc.data();
        allU.push(user);
      });

      setFullData(allU);
      setUserC(allU);
      setIsLoading(false);
    });
  }

  const emptylist = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>No users at the moment</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.userContainer} onPress={() => {
          navigation.navigate('Chat', { data: item.uid, id: id });
        }}>
        <View style={styles.userRow}>
          <Ionicons name="ios-person-circle-outline" size={30} color="#064663" />
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={emptylist}
        data={userC}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  userContainer: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    marginLeft: 15,
    color: '#064663',
  },
  emptyListContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyListText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
