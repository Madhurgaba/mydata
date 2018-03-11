import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

  const styles = StyleSheet.create({
    container: {
      resizeMode: 'stretch',
      width: null,
      height: null,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      resizeMode: 'stretch',
    },
  });


class Splash extends Component {

   componentWillMount () {
        setTimeout (() => {
          Actions.eventDescription();
        }, 2000);
    }

  render() {
    return (
        <Image style={styles.container} source={require('../img/splashBg.png')} / >
    );
  }
}

export default Splash;
