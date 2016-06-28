import React from 'react';
import ChannelsHeader from './ChannelsHeader';
import ChannelContainer from './ChannelContainer';

const ChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="channels" 
                      count={this.props.count} />
      <div className="clear"></div>
      <ul>
        {this.props.channels.map( channel =>
          <ChannelContainer channel={channel}
                            current_channel_id={this.props.current_channel_id}
                            switchChannel={this.props.switchChannel}
                            key={channel.id} />
        )}
      </ul>
    </div>
  }
});

export default ChannelsContainer;
