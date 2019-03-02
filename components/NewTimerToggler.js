import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton'; 
import TimerForm from './TimerForm';

export default class NewTimerToggler extends React.Component { 
  state = {
    isOpen: false
  }
  
  handleFormOpen = () => this.setState({isOpen: true})

  handleFormClose = () => this.setState({isOpen: false})

  handleFormSubmit = timerData => {
    const { onFormSubmit } = this.props;
    onFormSubmit(timerData);
    this.setState({ isOpen: false});
  }

  render() {
    const { isOpen } = this.state;

    return (
      <View 
        style={[styles.container, !isOpen && styles.buttonPadding]}>
        { isOpen 
          ? <TimerForm
              onFormSubmit={this.handleFormSubmit}
              onFormClose={this.handleFormClose}/> 
          : <TimerButton 
              title="+" 
              color="black"
              onPress={this.handleFormOpen}/>
        }
      </View> );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});