import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';

import firebase from './FirebaseConnection';

export default class Preload extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    // mostra tela antes de carregar o usuario autenticado
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Interna');
      } else {
        this.props.navigation.navigate('Home');
      }
    });
  }

  render() {
    return (
      <ImageBackground
        source={require('./../assets/img/fundo.jpeg')}
        style={styles.bgHome}>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastro e Localização</Text>
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
});
