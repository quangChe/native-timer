import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default class Timer extends React.Component {

  renderActionButton = () => {
    const { isRunning } = this.props;

    return isRunning  
      ? <TimerButton color="#DB2828" title="Stop" onPress={this.handleStop}/>
      : <TimerButton color="#21BA45" title="Start" onPress={this.handleStart}/>;
  }

  handleStart = () => {
    const { id, onStartPress } = this.props;
    onStartPress(id);
  }

  handleStop = () => {
    const { id, onStopPress } = this.props;
    onStopPress(id);
  }


  render() {
    const { 
      title, 
      project, 
      elapsed, 
      onEditPress, 
      isRunning,
      onRemoveTimer } = this.props;
    const elapsedString = millisecondsToHuman(elapsed);
  
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.project}>{project}</Text>
        <Text style={[
          styles.elapsedTime,
          isRunning ? styles.activeTimer : styles.inactiveTimer]}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton 
            text="#60b4ff" 
            small 
            title="Edit"
            onPress={onEditPress}/>
          <TimerButton 
            text="#60b4ff" 
            small 
            title="Remove" 
            onPress={onRemoveTimer}/>
        </View>
        {this.renderActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: '#fdfdfd',
    padding: 15,
    margin: 15,
    marginBottom: 0,
    borderRadius: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'monospace',
  },
  project: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'monospace',
  },
  elapsedTime: {
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#efefef',
    fontSize: 50,
    fontWeight: '100',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'monospace',
  },
  activeTimer: {
    borderColor: '#4494dc',
    color: '#4494dc',
    backgroundColor: '#fff',
    fontWeight: '200',
    borderWidth: 1,
    borderRadius: 10,
  },
  inactiveTimer: {
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

