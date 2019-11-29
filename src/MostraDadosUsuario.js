import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import firebase from './FirebaseConnection';
import {bold} from 'ansi-colors';

export default class MostraDadosUsuario extends Component {
  static navigationOptions = {
    title: 'Mostra Dados',
  };

  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      senhaInput: '',
      nome: '',
      sobrenome: '',
      estadoCivel: '',
      curso: '',
      graduacao: '',
      posGraduacao: '',
      Logradouro: '',
      cep: '',
      cidade: '',
      estado: '',
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref('users')
          .child(user.uid)
          .on('value', snapshot => {
            let state = this.state;
            state.nome = snapshot.val().nome;
            state.sobrenome = snapshot.val().sobrenome;
            state.dataNacimento = snapshot.val().dataNacimento;
            state.cpf = snapshot.val().cpf;
            state.estadoCivel = snapshot.val().estadoCivel;
            state.curso = snapshot.val().curso;
            state.graduacao = snapshot.val().graduacao;
            state.posGraduacao = snapshot.val().posGraduacao;
            state.Logradouro = snapshot.val().Logradouro;
            state.cep = snapshot.val().cep;
            state.cidade = snapshot.val().cidade;
            this.setState(state);
          });
      } else {
        this.props.navigation.navigate('Home');
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userId = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref('users')
          .child(user.uid)
          .on('value', snapshot => {
            let state = this.state;

            this.setState(state);
          });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleDadosPessoa}>Dados do Usuario</Text>
        <Text style={styles.textDadosUsuario}> Nome: {this.state.nome} </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          sobrenome: {this.state.sobrenome}{' '}
        </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          Data Nacimento: {this.state.dataNacimento}{' '}
        </Text>
        <Text style={styles.textDadosUsuario}> cpf: {this.state.cpf} </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          Estado Civel: {this.state.estadoCivel}{' '}
        </Text>
        <Text style={styles.textDadosUsuario}> curso: {this.state.curso} </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          Graduacao: {this.state.graduacao}{' '}
        </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          Pos Graduacao: {this.state.posGraduacao}{' '}
        </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          Logradouro: {this.state.Logradouro}{' '}
        </Text>
        <Text style={styles.textDadosUsuario}>
          {' '}
          Estado: {this.state.cidade}{' '}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  textDadosUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#ccc',
    width: 300,
    height: 30,
    margin: 10,
  },
  titleDadosPessoa: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
  },
});
