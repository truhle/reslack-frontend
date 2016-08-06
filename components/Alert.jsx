import React from 'react';
import AlertIcon from './AlertIcon';

const Alert = React.createClass({
  render() {
    return <div className="alert">
      <div className="alert-icon-container">
        <AlertIcon size="26" color="#cb5234" />
      </div>
      {this.props.alertMessage}
    </div>
  }
});

export default Alert;
