import React from 'react';
import CSUsername from './CSUsername';
import PresenceIndicator from './PresenceIndicator';

const DMContainer = React.createClass({
  getInitialState() {
    return {hidden: true};
  },

  toggleXCircle(e) {
    this.setState({hidden: !this.state.hidden});
  },
  
  render() {
    let usernames = this.props.usernames.filter(n => n != this.props.username );
    let nameCount = usernames.length;
    let present = this.props.users.find(
      u => u.username == usernames[0]
    ).present;
    
    let icon = nameCount > 1 ? <NameCountSquare nameCount={nameCount} />
                             : <PresenceIndicator present={present} />;
    
    let channelName = usernames.join(", ");
    
    let extraClass = this.props.channel_id == this.props.current_channel_id
                     ? " current_channel"
                     : "";

    return <li className={"channel-container overflow-ellipses" + extraClass}
               onMouseOver={this.toggleXCircle}
               onMouseOut={this.toggleXCircle}
               onClick={this.props.switchChannel.bind(null,  this.props.channel_id)}>
      {icon}
      <CSUsername present={present}     
                  username={channelName} />
      <XCircle hidden={this.state.hidden} />
    </li>
  }  
});

const NameCountSquare = React.createClass({
  render() {
    return <span className="name-count-square">
              <span className="name-count-number">
                {this.props.nameCount}
              </span>
           </span>
  }
});

const XCircle = React.createClass({
  render() {
    let hidden = this.props.hidden ? "hidden" : "";
    
    return <div className={"x-circle " + hidden}>
      x
    </div>
  }
});


export default DMContainer;
