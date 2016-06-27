import React from 'react';
import MessageGutter from './MessageGutter';

const Message = React.createClass({
  render() {
    return <div className="message">
      <MessageGutter time={this.props.time}
                     user={this.props.user}
                     starred={this.props.starred}
                     toggleMsgStarred={this.props.toggleMsgStarred} />
      {this.props.content}
    </div>
  }
});

export default Message;
