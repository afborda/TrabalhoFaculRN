import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import firebase from './FirebaseConnection';
import {TextInputMask} from 'react-native-masked-text';

export default class Interna extends Component {
  static navigationOptions = {
    title: 'Add Amigo',
  };

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
    };
    this.add = this.add.bind(this);
  }

  add() {
    if (this.state.nome != '' && this.state.cpf != '') {
      let uid = firebase.auth().currentUser.uid;

      let amigo = firebase
        .database()
        .ref('amigos')
        .child(firebase.auth().currentUser.uid);

      let key = amigo.push().key;

      amigo.child(key).set({
        type: 'amigos',
        nome: this.state.nome,
        cpf: this.state.cpf,
      });

      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleAmigo}>Adicionando amigos</Text>

        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={nome => this.setState({nome})}
          autoFocus={true}
        />

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

        <View>
          <TouchableHighlight
            underlayColor="#fff"
            style={styles.button}
            onPress={this.add}>
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
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
  titleTextSection: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  titleAmigo: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
});
