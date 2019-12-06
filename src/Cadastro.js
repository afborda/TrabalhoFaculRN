import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import firebase from './FirebaseConnection';

export default class Cadastro extends Component {
  static navigationOptions = {
    title: 'Cadastro',
    headerStyle: {
      backgroundColor: '#bfb',
    },
    headerTintColor: '#000',
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

    this.cadastrar = this.cadastrar.bind(this);

    firebase.auth().signOut();
  }

  // Adiciona dados no firebase
  cadastrar() {
    if (this.state.emailInput != '' && this.state.senhaInput != '') {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let uid = user.uid;

          firebase
            .database()
            .ref('users')
            .child(uid)
            .set({
              nome: this.state.nome,
              sobrenome: this.state.sobrenome,
              dataNacimento: this.state.dt,
              cpf: this.state.cpf,
              estadoCivel: this.state.estadoCivel,
              curso: this.state.curso,
              graduacao: this.state.graduacao,
              posGraduacao: this.state.posGraduacao,
              Logradouro: this.state.logradouro,
              cep: this.state.cep,
              cidade: this.state.cidade,
              estado: this.state.estado,
            });

          this.props.navigation.navigate('Interna');
        }
      });

      // cria usuario autenticado

      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.emailInput,
          this.state.senhaInput,
        )
        .catch(error => {
          alert(error.code);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.titleTextSection}>Dados de Login</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={emailInput => this.setState({emailInput})}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={senhaInput => this.setState({senhaInput})}
          />
          <Text style={styles.titleTextSection}>Informaçoe do Usuario</Text>
          <TextInput
            placeholder="Nome"
            style={styles.input}
            onChangeText={nome => this.setState({nome})}
          />
          <TextInput
            placeholder="Sobrenome"
            style={styles.input}
            onChangeText={sobrenome => this.setState({sobrenome})}
          />

          <View>
            <TouchableHighlight
              underlayColor="#fff"
              style={styles.button}
              onPress={this.cadastrar}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
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
    backgroundColor: '#bbccaa',
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
});
