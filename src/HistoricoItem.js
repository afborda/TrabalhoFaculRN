import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class HistoricoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.area}>
        <Text> {this.props.data.type} </Text>
        <Text> {this.props.data.nome} </Text>
        <Text> {this.props.data.cpf} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
  },
});
