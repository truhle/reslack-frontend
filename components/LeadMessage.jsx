import React from 'react';
import LeadMessageGutter from './LeadMessageGutter';
import LeadMessageHeader from './LeadMessageHeader';
import MessageContent from './MessageContent';

const LeadMessage = React.createClass({
  render() {
    return <div className="message lead-message">
      <LeadMessageGutter sender={this.props.sender}
                         users={this.props.users} />
      <LeadMessageHeader sender={this.props.sender} 
                         time={this.props.time}
                         starred={this.props.starred}
                         toggleMsgStarred={this.props.toggleMsgStarred} />
      <MessageContent content={this.props.content} />
    </div>
  }
});

export default LeadMessage;
