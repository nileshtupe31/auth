import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './src/components/common';
import { LoginForm } from './src/components/LoginForm';


export default class App extends React.Component {

  componentDidMount() {
      firebase.initializeApp({
        apiKey: 'AIzaSyAD-ZPOk_fOnZ4JraEZkaP-r1Gh3hL9XbY',
        authDomain: 'auth-5e11d.firebaseapp.com',
        databaseURL: 'https://auth-5e11d.firebaseio.com',
        projectId: 'auth-5e11d',
        storageBucket: 'auth-5e11d.appspot.com',
        messagingSenderId: '1072014830658'
      }
    ); 
  }

  render() {
    return (
      <View >
        <Header> Authentication </Header>
        <LoginForm />
      </View>
    );
  }
}
