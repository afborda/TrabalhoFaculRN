import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/Login';
import Home from './src/Home';
import Cadastro from './src/Cadastro';
import Interna from './src/Interna';
import Preload from './src/Preload';
import AddAmigos from './src/AddAmigos';
import MostraDadosUsuario from './src/MostraDadosUsuario';

const Navigate = createStackNavigator({
  Preload: {
    screen: Preload,
  },
  Home: {
    screen: Home,
  },
  Cadastro: {
    screen: Cadastro,
  },
  MostraDadosUsuario: {
    screen: MostraDadosUsuario,
  },
  Login: {
    screen: Login,
  },
  Interna: {
    screen: Interna,
  },
  AddAmigos: {
    screen: AddAmigos,
  },
});
const AppContainer = createAppContainer(Navigate);
export default AppContainer;
