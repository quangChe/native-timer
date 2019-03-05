import React from 'react';
import { StyleSheet, View, ScrollView, Text, Platform, KeyboardAvoidingView } from 'react-native';

import EditableTimer from './components/EditableTimer';
import NewTimerToggler from './components/NewTimerToggler';

import uuidv4 from 'uuid/v4';
import { newTimer } from './utils/TimerUtils';

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: 'Stare at the ceiling',
        project: 'Recreational',
        id: uuidv4(),
        elapsed: 0,
        isRunning: false
      },
      {
        title: 'Cut/eat watermelon',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 0,
        isRunning: false
      }
    ],
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.setState({
      timers: this.state.timers.map(timer => {
        return {
          ...timer,
          elapsed: timer.isRunning 
                    ? timer.elapsed + 1000
                    : timer.elapsed
        }
      })
    }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreation = timerData => {
    const { timers } = this.state;
    this.setState({timers: [newTimer(timerData), ...timers]});
  }

  handleEdit = timerData => {
    const updatedTimers = this.state.timers.map(timer => {
      return (timer.id === timerData.id) 
        ? { ...timer, project: timerData.project,
            title: timerData.title }
        : timer;
    })

    this.setState({timers: updatedTimers});
  }

  handleDelete = (id) => {
    const remainingTimers = 
      this.state.timers.filter(timer => timer.id !== id);

    this.setState({timers: remainingTimers})
  }

  toggleTimer = timerId => {
    this.setState({
      timers: this.state.timers.map(timer => {
        return (timer.id === timerId)
          ? {...timer, isRunning: !timer.isRunning}
          : timer;
      })
    })
  }

  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}><Text style={styles.titleHighlight}>my</Text>Timer</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}>
          <ScrollView style={styles.timerList}>
            <NewTimerToggler 
              style={styles.timerToggle} 
              onFormSubmit={this.handleCreation}/> 
              {timers.map(
                ({title, project, id, elapsed, isRunning}) => (
                  <EditableTimer
                    key={id}
                    id={id}
                    title={title}
                    project={project}
                    elapsed={elapsed}
                    isRunning={isRunning}
                    onFormEdit={this.handleEdit}
                    onTimerDelete={this.handleDelete}
                    onStartPress={this.toggleTimer}
                    onStopPress={this.toggleTimer}/>
                )
              )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View> 
    );      
  }
}

const styles = StyleSheet.create({ 
  appContainer: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  }, 
  titleHighlight: {
    color: '#3b91de',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'monospace',
  },
  timerListContainer: {
    flex: 1,
    paddingBottom: 20
  },
  timerList: {
    paddingBottom: 15,
  },
  timerToggle: {
    borderRadius: 50,
    width: 50
  }
});
