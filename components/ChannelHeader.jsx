import React from 'react';
import ChannelTitle from './ChannelTitle';
import MoreItems from './MoreItems';
import ShowStarredItems from './ShowStarredItems';
import ShowMentions from './ShowMentions';
import SearchBar from './SearchBar';
import ShowChannelDetails from './ShowChannelDetails';
import ChannelSettings from './ChannelSettings.jsx';

const ChannelHeader = React.createClass({
  render() {
    return <div className="channel-header">
      <ChannelTitle viewChannel={this.props.viewChannel}
                    current_user={this.props.current_user}
                    users={this.props.users}
                    toggleChannelStarred={this.props.toggleChannelStarred} />
      <MoreItems />
      <ShowStarredItems />
      <ShowMentions />
      <SearchBar />
      <div className="divider-bar"></div>
      <ShowChannelDetails />
      <ChannelSettings />
    </div>
  }
});

export default ChannelHeader;
