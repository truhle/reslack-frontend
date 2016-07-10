import React from 'react';
import StarredChannelsContainer from './StarredChannelsContainer';
import ChannelsContainer from './ChannelsContainer';
import DMChannelsContainer from './DMChannelsContainer';

const ChannelsScroller = React.createClass({
  getStarredChannels(channels) {
    return channels.filter(ch => ch.starred);
  },
  
  getUnstarredChannels(channels) {
    return channels.filter(ch => !ch.starred);
  },
  
  render() {
    let current_channel_id = this.props.current_user.current_channel_id;
    let channels = this.props.all_channels.filter(ch => ch.channel_type == "group");
    let direct_channels = this.props.all_channels.filter(ch => ch.channel_type == "direct");
    
    let channels_count = channels.length;
    
    let starred_channels = this.getStarredChannels(this.props.all_channels);
    let unstarred_channels = this.getUnstarredChannels(channels);
    let unstarred_direct_channels = this.getUnstarredChannels(direct_channels);
    
    return <div className="channels-scroller">
      <StarredChannelsContainer current_channel_id={current_channel_id}
                                username={this.props.current_user.username}
                                channels={starred_channels}
                                users={this.props.users}
                                switchChannel={this.props.switchChannel}/>
      <ChannelsContainer current_channel_id={current_channel_id}
                         channels={unstarred_channels}
                         count={channels_count}
                         switchChannel={this.props.switchChannel} />
      <DMChannelsContainer current_channel_id={current_channel_id}
                           username={this.props.current_user.username}
                           direct_channels={unstarred_direct_channels}
                           users={this.props.users}
                           switchChannel={this.props.switchChannel} />
    </div>
  }
});

export default ChannelsScroller;
