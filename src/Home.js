import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.cadastrar = this.cadastrar.bind(this);
    this.login = this.login.bind(this);
  }

  cadastrar() {
    this.props.navigation.navigate('Cadastro');
  }

  login() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <ImageBackground
        source={require('./../assets/img/fundo.jpeg')}
        style={styles.bgHome}>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastro e Localização</Text>
          <View style={styles.buttonArea}>
            <TouchableHighlight
              underlayColor="#fff"
              style={styles.button}
              onPress={this.cadastrar}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#fff"
              style={styles.button}
              onPress={this.login}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgHome: {
    flex: 1,
    width: null,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonArea: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#bfb',
    margin: 10,
    height: 40,
    width: 300,
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
});
