import React  from 'react';
import PropTypes from 'prop-types';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
    project: PropTypes.string.isRequired, 
    elapsed: PropTypes.number.isRequired, 
    isRunning: PropTypes.bool.isRequired,
    onFormEdit: PropTypes.func.isRequired,
    onTimerDelete: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired, 
    onStopPress: PropTypes.func.isRequired
  }
  
  state = {
    editFormOpen: false
  }

  handleFormClose = () => this.setState({editFormOpen: false})

  handleEditPress = () => {
    this.setState({editFormOpen: true});
  }

  handleFormSubmit = (timerData) => {
    const { onFormEdit } = this.props;
    onFormEdit(timerData);
    this.setState({editFormOpen: false});
  }

  handleTimerDelete = (e) => {
    const { id, onTimerDelete } = this.props;
    return onTimerDelete(id);
  }

  handleTimerStart = () => {
    const { toggleTimer, id } = this.props;
    toggleTimer(id)
  }

  handleTimerStop = () => {
    const { toggleTimer, id } = this.props;
    toggleTimer(id)
  }

  render() {
    const {id, title, project, elapsed, isRunning,
      onStartPress, onStopPress } = this.props;
    const { editFormOpen } = this.state;
    
    if (editFormOpen) {
      return <TimerForm 
                id={id} 
                title={title} 
                project={project}
                onFormClose={this.handleFormClose}
                onFormSubmit={this.handleFormSubmit}/>; 
    }
    
    return <Timer 
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onEditPress={this.handleEditPress}
              onRemoveTimer={this.handleTimerDelete}
              onStartPress={onStartPress}
              onStopPress={onStopPress}/> 
  }
}
   