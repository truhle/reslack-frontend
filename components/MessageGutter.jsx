import React from 'react';
import Timestamp from './Timestamp';
import StarToggle from './StarToggle';

const MessageGutter = React.createClass({
  render() {
    return <div className="message-gutter">
      <Timestamp time={this.props.time} lead={false} />
      <StarToggle starred={this.props.starred} 
                  toggleStarred={this.props.toggleMsgStarred} />
    </div>
  }
});

export default MessageGutter;
