import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';

class AddEditList extends Component {
  render() {
    return (
      <View>
        <TextInput />
      </View>
    )
  }
}

export default connect()(AddEditList);
