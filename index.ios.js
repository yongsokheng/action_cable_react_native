import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import ActionCable from 'react-native-actioncable'

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default class action_cable_demo extends Component {
  constructor(props) {
    super(props);

    this.state = {message: "Write message ..."};
  }

  componentDidMount () {
    self = this;
    this.subscription = cable.subscriptions.create(
      'ConversationsChannel',
      {
        received (data) {
          console.log("message" + data.message)
          self.setState({
            message: data.message
          });
        }
      }
    )
  }

  componentWillUnmount () {
    this.subscription && cable.subscriptions.remove(this.subscription)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('action_cable_demo', () => action_cable_demo);
