import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', isLoading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', isLoading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onSuccess.bind(this))
      .catch((e) => this.onFailure(e));
    });
  }

  onSuccess() {
    this.setState({
          email: '',
          password: '',
          error: '',
          isLoading: false
    });
  }

  onFailure(e) {
    this.setState({
          password: '',
          error: e.message,
          isLoading: false
    });
  }

  showButton() {
    if (this.state.isLoading) {
      return (
        <Spinner size='small' />
      );
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}> Log In </Button>
    );
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            placeholder='abc@email.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Password'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.showButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export { LoginForm };
