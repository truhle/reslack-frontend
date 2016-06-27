import React from 'react';
import LeadMessage from './LeadMessage';
import Message from './Message';

const MessageBlock = React.createClass({
  makeMessages(msgs) {
    return msgs.map(
      (m, i) => i == 0 
                ? <LeadMessage key={m.id}
                               time={m.time.timeString} 
                               sender={m.sender}
                               users={this.props.users}
                               starred={m.starred}
                               content={m.content}
                               toggleMsgStarred={this.props.toggleMsgStarred.bind(null, m.id)} />
                : <Message key={m.id}
                           time={m.time.timeString} 
                           sender={m.sender}
                           starred={m.starred}
                           content={m.content}
                           toggleMsgStarred={this.props.toggleMsgStarred.bind(null, m.id)} />
    );
  },
  
  render() {
    let messages = this.makeMessages(this.props.messages);
    
    return <div className="message-block">
      {messages}
    </div>
  }
});

export default MessageBlock;
