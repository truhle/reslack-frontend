import React from 'react';

const ChannelInfo = React.createClass({
  render() {
    let divider = null, topic = null;
    if (this.props.topic) {
      divider = <span className="subtitle-divider">|</span>;
      topic = <Topic topic={this.props.topic}
                     toggleStarToggleVisibility={this.props.toggleStarToggleVisibility} />
    } 
    
    return <div className="channel-info">
      <MemberCount memberCount={this.props.memberCount} />
      {divider}
      {topic}
    </div>
  }
});

const MemberCount = React.createClass({
  render() {
    let pluralized = this.props.memberCount == 1 ? "member" : "members";
    
    return <div className="member-count">
      {this.props.memberCount} {pluralized}
    </div>
  }
});

const Topic = React.createClass({
  render() {
    return <div className="topic" 
                onMouseOver={this.props.toggleStarToggleVisibility}
                onMouseOut={this.props.toggleStarToggleVisibility}>
      {this.props.topic}
    </div>
  }
});

export default ChannelInfo;
