import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import TimerButton from './TimerButton';

export default class TimerForm extends React.Component { 
  state = {
    title: this.props.id ? this.props.title : '',
    project: this.props.id ? this.props.project : ''
  }

  secondInput = (input) => {
    this.nextInput = input;
  }

  focusNextInput = () => {
    this.nextInput.focus();
  }


  handleTitleChange = title => this.setState({title});

  handleProjectChange = project => this.setState({project});

  handleSubmit = () => {
    const { onFormSubmit, id } = this.props;
    const { title, project } = this.state;
    onFormSubmit({id, title, project});
  }

  render() {
    const { id, onFormClose } = this.props;
    const { title, project } = this.state;
    const submitText = id ? 'Update' : 'Create';

    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Title</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleTitleChange}
              value={title}
              onSubmitEditing={this.focusNextInput}/> 
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Project</Text>
          <View style={styles.textInputContainer}>
            <TextInput 
              ref={this.secondInput}
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleProjectChange}
              value={project}
              onSubmitEditing={this.handleSubmit}/> 
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TimerButton 
            style={styles.buttons}
            small 
            text="#DB2828" 
            title="Cancel" 
            onPress={onFormClose}/>
          <TimerButton 
            style={styles.buttons}
            small 
            text="#21BA45" 
            title={submitText} 
            onPress={this.handleSubmit}/>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({ 
  formContainer: {
    backgroundColor: 'white',
    borderColor: '#e1ddf1',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
  },
});