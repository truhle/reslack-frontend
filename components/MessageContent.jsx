import React from 'react';

const MessageContent = React.createClass({
  render() {
    return <div className="message-content">
      {this.props.content}
    </div>
  }
});

export default MessageContent;
