import React from 'react';
import MessageBlock from './MessageBlock';

const DayMessages = React.createClass({
  splitIntoBlocks(messages) {
    let firstMessage = messages[0];
    let rest = messages.slice(1, messages.length);
    
    return rest.reduce(function(acc, m) {
      let currentBlock = acc[acc.length - 1];
      let lastMessage = currentBlock[currentBlock.length - 1];
      if (lastMessage.sender == m.sender
          && m.timestamp - lastMessage.timestamp < 300000) {
        return acc.slice(0, acc.length - 1).concat([currentBlock.concat([m])]);
      }
      else {
        return acc.concat([[m]]);
      }
    }, [[firstMessage]]);
  },
  
  makeMessageBlocks(messages) {
    return this.splitIntoBlocks(messages).map(
      (ary, i) => <MessageBlock key={i}
                                messages={ary}
                                users={this.props.users}
                                toggleMsgStarred={this.props.toggleMsgStarred} />
    );
  },
  
  render() {
    let messageBlocks = this.makeMessageBlocks(this.props.messages);
    
    return <div className="day-messages">
      {messageBlocks}
    </div>
  }
});

export default DayMessages;
