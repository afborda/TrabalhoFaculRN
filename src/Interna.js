import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Button} from 'react-native';
import firebase from './FirebaseConnection';
import HistoricoItem from './HistoricoItem';
import {TextInputMask} from 'react-native-masked-text';

export default class Interna extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      historico: [],
      cpf: '',
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
            this.setState(state);
          });

        firebase
          .database()
          .ref('amigos')
          .child(user.uid)
          .on('value', snapshot => {
            let state = this.state;
            state.historico = [];
            snapshot.forEach(childItem => {
              state.historico.push({
                key: childItem.key,
                type: childItem.val().type,
                nome: childItem.val().nome,
                cpf: childItem.val().cpf,
              });
            });
            this.setState(state);
          });
      } else {
        this.props.navigation.navigate('Home');
      }
    });
    this.mostraDadosUsuario = this.mostraDadosUsuario.bind(this);
    this.addAmigos = this.addAmigos.bind(this);
    this.sair = this.sair.bind(this);
  }

  mostraDadosUsuario() {
    this.props.navigation.navigate('MostraDadosUsuario');
  }

  addAmigos() {
    this.props.navigation.navigate('AddAmigos');
  }

  sair() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nomaArea}>
          <Text style={styles.nomeUser}> Nome: {this.state.nome}</Text>
        </View>
        <TextInputMask
          placeholder="CPF"
          style={styles.input}
          type={'cpf'}
          value={this.state.cpf}
          onChangeText={cpf => {
            this.setState({
              cpf: cpf,
            });
          }}
        />
        <FlatList
          style={styles.historico}
          data={this.state.historico}
          renderItem={({item}) => <HistoricoItem data={item} />}
        />

        <View style={styles.botoesArea}>
          <Button
            title="Dados Usuario"
            onPress={this.mostraDadosUsuario}></Button>
          <Button title="+ Amigos" onPress={this.addAmigos}></Button>
          <Button title=" Sair" onPress={this.sair}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nomaArea: {
    paddingVertical: 20,
    backgroundColor: '#bfb',
  },
  nomeUser: {
    textAlign: 'center',
    fontSize: 20,
  },
  historico: {
    flex: 1,
  },
  botoesArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#dddddd',
  },
});
