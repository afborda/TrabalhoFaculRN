import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import firebase from './FirebaseConnection';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      senha: '',
    };

    this.login = this.login.bind(this);

    firebase.auth().signOut();
  }

  login() {
    if (this.state.mail != '' && this.state.senha != '') {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate('Interna');
      });

      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.mail, this.state.senha)
        .catch(error => {
          alert(error.code);
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgLogin}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 100}}
            source={{
              uri:
                'https://images.unsplash.com/photo-1506919258185-6078bba55d2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1030&q=80',
            }}
          />
        </View>
        <TextInput
          placeholder="Login"
          style={styles.inputs}
          onChangeText={mail => this.setState({mail})}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry={true}
          style={styles.inputs}
          onChangeText={senha => this.setState({senha})}
        />

        <TouchableHighlight style={styles.buttonLogin} onPress={this.login}>
          <Text style={styles.textButton}>login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogin: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 30,
    shadowColor: '#000',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    width: '75%',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textLabel: {
    fontSize: 16,
    letterSpacing: 0.8,
    fontWeight: '800',
  },
  buttonLogin: {
    width: '75%',
    backgroundColor: '#bfb',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 10,
  },
  textButton: {
    padding: 10,
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
});
