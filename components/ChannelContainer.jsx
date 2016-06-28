import React from 'react';
import ChannelTypeIndicator from './ChannelTypeIndicator';

const ChannelContainer = React.createClass({
  render() {
    let extraClass = this.props.current_channel_id == this.props.channel.id 
                     ? " current-channel"
                     : "";
    return <li className={"channel-container overflow-ellipses" + extraClass}
               onClick={this.props.switchChannel.bind(null, this.props.channel.id)} >
      <ChannelTypeIndicator channel={this.props.channel} 
                            size="10.5px"
                            extraClass="CS" />
      <span className="channel-name">{this.props.channel.name}</span>
    </li>
  }
});

export default ChannelContainer;
