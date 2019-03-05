import { StyleSheet, Text, TouchableOpacity, Platform, ColorPropType } from 'react-native'; 
import React from 'react';
import PropTypes from 'prop-types';

export default function TimerButton({ 
  color, title, small,onPress,text,width}) { 
    return (
      <TouchableOpacity
        style={[styles.button, 
          { backgroundColor: color },
          { width: width ? Number(width) : null}]}
        onPress={onPress}> 
          <Text style={[styles.buttonText, 
            small ? styles.small : styles.large,
            {color: text ? text : '#fff'}]}> {title} </Text>
      </TouchableOpacity>
    ); 
}

TimerButton.propTypes = {
  color: ColorPropType,
  text: ColorPropType,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  onPress: PropTypes.func.isRequired
}

TimerButton.defaultProps = {
  small: false
}

const styles=StyleSheet.create({ 
  button: {
    marginTop: 10,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  small: {
    fontSize: 14,
    padding: 5,
    fontWeight: '600',
  },
  large: {
    fontSize: 20,
    padding: 10,
    borderRadius: 50,
    fontWeight: '400',
  },
  buttonText: {
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'monospace',
  },
});