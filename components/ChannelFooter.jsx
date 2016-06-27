import React from 'react';
import MessageInputContainer from './MessageInputContainer';
import NotificationBar from './NotificationBar';

const ChannelFooter = React.createClass({
  render() {
    return <div className="channel-footer">
      <MessageInputContainer addMessage={this.props.addMessage} />
      <NotificationBar />
    </div>
  }
});

export default ChannelFooter;
