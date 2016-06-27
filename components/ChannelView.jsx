import React from 'react';
import ChannelHeader from './ChannelHeader';
import MessagesContainer from './MessagesContainer';
import ChannelFooter from './ChannelFooter';

const ChannelView = React.createClass({
  render() {
    return <div>
      <ChannelHeader viewChannel={this.props.viewChannel}
                     current_user={this.props.current_user}
                     users={this.props.users}
                     toggleChannelStarred={this.props.toggleChannelStarred} />
      <MessagesContainer messages={this.props.messages}
                         viewChannel={this.props.viewChannel}
                         current_user={this.props.current_user}
                         users={this.props.users}
                         toggleMsgStarred={this.props.toggleMsgStarred} />
      <ChannelFooter addMessage={this.props.addMessage} />
    </div>
  }
});

export default ChannelView;
