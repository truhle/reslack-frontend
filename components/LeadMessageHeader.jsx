import React from 'react';
import Timestamp from './Timestamp';
import StarToggle from './StarToggle';

const LeadMessageHeader = React.createClass({
  render() {
    return <div className="lead-message-header">
      <Sender sender={this.props.sender} />
      <Timestamp time={this.props.time}
                 lead={true} />
      <StarToggle starred={this.props.starred}
                  toggleStarred={this.props.toggleMsgStarred} />
    </div>
  }
});

const Sender = React.createClass({
  render() {
    return <span className="sender">
      {this.props.sender}
    </span>
  }
});

export default LeadMessageHeader;
