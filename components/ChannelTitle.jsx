import React from 'react';
import ReactDOM from 'react-dom';
import DMSubtitle from './DMSubtitle';
import ChannelInfo from './ChannelInfo';
import ChannelTypeIndicator from './ChannelTypeIndicator';
import StarToggle from './StarToggle';

const ChannelTitle = React.createClass({
  toggleStarToggleVisibility() {
    if (this.refs.myStarToggle != null) {
      ReactDOM.findDOMNode(this.refs.myStarToggle).classList.toggle("hidden");
    }
  },
  
  isPresent(name) {
    return this.props.users.find(user => user.username == name).present;
  },
  
  getFullName(name) {
    return this.props.users.find(user => user.username == name).full_name;
  },
  
  render() {
    let displayName, awayClass, usernames;
    let isPresent = this.isPresent;
    
    if (this.props.viewChannel.name) {
      displayName = <span className="channel-header-name">
                       {this.props.viewChannel.name}
                     </span>;
      awayClass = "";
    } 
    else {
      let currentUsername = this.props.current_user.username;
      usernames = this.props.viewChannel.usernames.filter(
         n => n != currentUsername
      );
      let lastIndex = usernames.length - 1;
      
      displayName = usernames.map(function(n, i) {
         let away = isPresent(n) ? "" : " away";
         let comma = i == lastIndex ? "" : ", ";
         
         return <span className={"channel-header-name" + away}
                      key={n}>
                  {n + comma}
                </span>;
       });

      awayClass = usernames.length > 1 ? "" : isPresent(usernames[0]) ? "" : " away";
    };
    
    let memberCount = this.props.viewChannel.channel_type == "group"
                    ? this.props.users.reduce( (count, user) =>
                        user.channels.indexOf(this.props.viewChannel.name) == -1 
                        ? count 
                        : count + 1, 0)
                    : this.props.viewChannel.usernames.length;
                    
    let channelSubtitle = this.props.viewChannel.channel_type == "direct" 
                          && memberCount == 2 
                          ? <DMSubtitle present={isPresent(usernames[0])}
                                        fullName={this.getFullName(usernames[0])}/>
                          : <ChannelInfo memberCount={memberCount}
                                         topic={this.props.viewChannel.topic}
                                         toggleStarToggleVisibility={this.toggleStarToggleVisibility} />;
    
    return <div className="channel-title-container">
      <div className="channel-title overflow-ellipses">
        <ChannelTypeIndicator channel={this.props.viewChannel}
                              size="13.2px"
                              extraClass={"CH" + awayClass} />
        
        {displayName}
      </div>
      
      <StarToggle ref={this.props.viewChannel.starred ? null : "myStarToggle"}
                  starred={this.props.viewChannel.starred}
                  toggleStarred={this.props.toggleChannelStarred.bind(null, this.props.viewChannel.id)} /> 
      <br />
      
      {channelSubtitle}
    </div>
  }
});

export default ChannelTitle;
