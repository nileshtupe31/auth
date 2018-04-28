import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './src/components/common';
import { LoginForm } from './src/components/LoginForm';


export default class App extends React.Component {

  state = { isUserLoggedIn: null }

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

    firebase.auth().onAuthStateChanged((state) => {
      if (state) {
        this.setState({ isUserLoggedIn: true });
      } else {
        this.setState({ isUserLoggedIn: false });
      }
    });
  }

  renderAppState() {
    switch (this.state.isUserLoggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>

        );
      case false:
        return (
          <LoginForm />
        );
      default:
        return (
          <View style={styles.spinnerContainerStyle}>
            <Spinner size='large' />
          </View>

        );
    }
  }

  render() {
    return (
      <View >
        <Header> Authentication </Header>
        {this.renderAppState()}
      </View>
    );
  }
}

const styles = {
  spinnerContainerStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100
  }
};
