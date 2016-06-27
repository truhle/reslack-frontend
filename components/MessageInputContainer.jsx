import React from 'react';

const MessageInputContainer = React.createClass({
  getInitialState() {
    return { msgContent: "" };
  },
  
  updateMessage(e) {
    this.setState({ msgContent: e.target.value })
  },
  
  resetMessage() {
    this.setState({ msgContent: ""});
  },
  
  render() {
    return <div className="message-input-container">
      <pre className="resize-mirror"><span>{this.state.message}</span><br/></pre>
      <MessageInput msgContent={this.state.msgContent}
                    addMessage={this.props.addMessage}
                    resetMessage={this.resetMessage}
                    updateMessage={this.updateMessage} />
      <PrimaryFileButton />
    </div>
  }
});

const MessageInput = React.createClass({
  handleEnter(e) {
    let messageNotEmpty = this.props.msgContent.trim() != "";
    if (e.keyCode == 13 && messageNotEmpty) {
      e.preventDefault();
      this.props.addMessage(this.props.msgContent);
      this.props.resetMessage();
    }
  },
  render() {
    return <textarea className="message-input" 
                     rows="1"
                     value={this.props.msgContent}
                     onKeyDown={this.handleEnter}
                     onInput={this.props.updateMessage}></textarea>
  }
});

const PrimaryFileButton = React.createClass({
  render() {
    let plus = <svg className="plus" xmlns="http://www.w3.org/2000/svg" 
                    version="1.1" viewBox="0 0 32 32"
                    width="16px"
                    height="16px">
      <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>
    return <div className="primary-file-button">
      {plus}
    </div>
  }
});

export default MessageInputContainer;
