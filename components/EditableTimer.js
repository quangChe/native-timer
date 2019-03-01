import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
  state = {
    editFormOpen: false
  }

  render() {
    const {id, title, project, elapsed, isRunning, editFormOpen } = this.props;
    
    if (editFormOpen) {
      return <TimerForm id={id} title={title} project={project}/>; 
    }
    
    return <Timer 
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}/> 
  }
}
   