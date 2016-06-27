import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import ChannelView from './components/ChannelView';
import PresenceIndicator from './components/PresenceIndicator';
import FilledStar from './components/FilledStar';
import ChannelTypeIndicator from './components/ChannelTypeIndicator';

const App = React.createClass({
  getInitialState() {
    return {
      group_name: "MetaTree",
      current_user: {
        username: "taliesin",
        present: true,
        current_channel_id: 1,
        unreadChannels: [],
        unreadMentions: []
      },
      all_channels: [
        { name: "general", id: 1, private: false, 
          starred: false, type: "group", topic: "Add a topic",
          created_by: "taliesin", purpose: "This channel is for team wide comminication and announcements.  All team members are in this channel."
        },
        { name: "random", id: 2, private: false, 
          starred: true, type: "group", topic: "Random stuff", 
          created_by: "taliesin", purpose: null
        },
        { name: "webschool", id: 3, private: true, 
          starred: false, type: "group", topic: "Web, web, web",
          created_by: "sean", purpose: null
        },
        { usernames: ["bob", "taliesin"], id: 4, starred: false, type: "direct" },
        { usernames: ["haizop", "taliesin"], id: 5, starred: true, type: "direct" },
        { usernames: ["sean", "taliesin"], id: 6, starred: false, type: "direct" },
        { usernames: ["haizop", "sean", "bob", "taliesin"], id: 7, starred: true, type: "direct" }
      ],
      messages: [
        { timestamp: 1465322440932,
          id: 1,
          channel_id: 1,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1465322440932,
          id: 2,
          channel_id: 2,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1465341900077,
          id: 3,
          channel_id: 4,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1465341900077,
          id: 4,
          channel_id: 5,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1465341900077,
          id: 5,
          channel_id: 6,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1465322840932,
          id: 6,
          channel_id: 1,
          beginning: false,
          sender: "taliesin",
          starred: false,
          content: "Hey there! From lead message.." },
        { timestamp: 1465322968820,
          id: 7,
          channel_id: 1,
          beginning: false,
          sender: "taliesin",
          starred: false,
          content: "Great to see you, from message" },
        { timestamp: 1465322998195,
          id: 8,
          channel_id: 1,
          beginning: false,
          sender: "taliesin",
          starred: false,
          content: "Great to see you, from message again" },
        { timestamp: 1465323037518,
          id: 9,
          channel_id: 1,
          beginning: false,
          sender: "taliesin",
          starred: false,
          content: "Great to see you, from message this time a very very, very, longish and longish and maybe over a whole line message for your delight and enjoyment!" },
        { timestamp: 1465341773043,
          id: 10,
          channel_id: 1,
          beginning: false,
          sender: "taliesin",
          starred: false,
          content: "Writing again, just a little later now..." },
        { timestamp: 1465341850077,
          id: 11,
          channel_id: 1,
          beginning: false,
          sender: "bob",
          starred: false,
          content: "Yeah, great to see you here!" },
        { timestamp: 1465341900077,
          id: 12,
          channel_id: 1,
          beginning: false,
          sender: "bob",
          starred: false,
          content: "I finally got around to getting on here." },
        { timestamp: 1465342000077,
          id: 13,
          channel_id: 1,
          beginning: false,
          sender: "haizop",
          starred: true,
          content: "Life is beautiful." },
        { timestamp: 1466542489988,
          id: 14,
          channel_id: 3,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1466695362113,
          id: 15,
          channel_id: 7,
          beginning: true,
          sender: null,
          starred: false,
          content: "" },
        { timestamp: 1466784530560,
          id: 16,
          channel_id: 1,
          beginning: false,
          sender: "sean",
          starred: false,
          content: "Loving the summer.." }
      ],
      users: [
        { username: "taliesin", full_name: "Todd Ruhlen", present: true, 
          channels: ["general", "random", "webschool"], icon: "lightcoral" },
        { username: "bob", full_name: "Bob L.", present: false, 
          channels: ["general", "random"], icon: "cornflowerblue" },
        { username: "haizop", full_name: "Haiz O.", present: true, 
          channels: ["general", "random", "webschool"], icon: "goldenrod" },
        { username: "sean", full_name: "Sean O.", present: true, 
          channels: ["general", "random", "webschool"], icon: "plum" }
      ]
    };
  },
  
  addMessage(text, e) {
    let messages = this.state.messages;
    let lastId = messages[messages.length - 1].id;
    let current_user = this.state.current_user;
    
    let message = {
      timestamp: Date.now(),
      id: lastId + 1,
      channel_id: current_user.current_channel_id,
      beginning: false,
      sender: current_user.username,
      starred: false,
      content: text
    };
    
    this.setState({ messages: [...messages, message] });
  },
  
  switchChannel(id, e) {
    this.setState( 
      { current_user: {...this.state.current_user, current_channel_id: id} }
    );
  },
  
  toggleChannelStarred(id, e) {
    let updatedChannels = this.state.all_channels.map(
      ch => ch.id == id ? {...ch, starred: !ch.starred} : ch
    );
    this.setState({all_channels: updatedChannels});
  },
  
  toggleMsgStarred(id, e) {
    let updatedMsgs = this.state.messages.map(
      msg => msg.id == id ? {...msg, starred: !msg.starred} : msg
    );
    this.setState({messages: updatedMsgs});
  },
  
  render() {
    let current_channel_id = this.state.current_user.current_channel_id;
    let viewChannel = this.state.all_channels.find(
      ch => ch.id == current_channel_id
    );
    let viewChannelMsgs = this.state.messages.filter(
      m => m.channel_id == current_channel_id
    );
    
    return <div>
      <ChannelSwitcher current_user={this.state.current_user}
                       all_channels={this.state.all_channels}
                       group_name={this.state.group_name}
                       users={this.state.users}
                       switchChannel={this.switchChannel} />
      <ChannelView viewChannel={viewChannel}
                   current_user={this.state.current_user}
                   users={this.state.users}
                   messages={viewChannelMsgs}
                   addMessage={this.addMessage}
                   toggleChannelStarred={this.toggleChannelStarred}
                   toggleMsgStarred={this.toggleMsgStarred} />
    </div>
  }
}); 

const ChannelSwitcher = React.createClass({
  render() {
    return <div className="channel-switcher">
      <CSHeader group_name={this.props.group_name}
                username={this.props.current_user.username}
                present={this.props.current_user.present} />
      <ChannelsScroller current_user={this.props.current_user}
                        all_channels={this.props.all_channels}
                        users={this.props.users}
                        switchChannel={this.props.switchChannel} />
    </div>
  }
});

const ChannelsScroller = React.createClass({
  getStarredChannels(channels) {
    return channels.filter(ch => ch.starred);
  },
  
  getUnstarredChannels(channels) {
    return channels.filter(ch => !ch.starred);
  },
  
  render() {
    let current_channel_id = this.props.current_user.current_channel_id;
    let channels = this.props.all_channels.filter(ch => ch.type == "group");
    let direct_channels = this.props.all_channels.filter(ch => ch.type == "direct");
    
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

const CSHeader = React.createClass({
  render() {
    return <div className="cs-header">
        <CSHeaderName group_name={this.props.group_name} />
        <NotificationsIcon />
        <UserIndicator present={this.props.present} 
                       username={this.props.username} /> 
        <div className="clear"></div>
    </div>
  }
});

const CSHeaderName = React.createClass({
  render() {
    return <div className="cs-header-name overflow-ellipses">
      {this.props.group_name} 
      <span className="cs-header-or">&or;</span>
    </div>
  }
});

const UserIndicator = React.createClass({
  render() {
    return <div>
      <PresenceIndicator present={this.props.present} 
                         extraClass=" cs-header-presence" />
      <CSUsername present={this.props.present} 
                  username={this.props.username}
                  header={true} />
    </div>
  }
});

const NotificationsIcon = React.createClass({
  render() {
    let svg = 
    <svg width="20px" height="20px" viewBox="0 0 98 98" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path className="bell" fill="#ab9ba9" d=" M 41.28 8.20 C 47.18 4.96 55.28 5.17 60.58 9.49 C 63.88 12.22 64.70 16.63 65.18 20.65 C 70.81 24.51 75.29 30.06 77.32 36.62 C 79.44 42.85 79.86 49.47 80.03 56.00 C 83.29 59.69 87.87 62.53 89.66 67.29 C 91.07 71.19 87.78 75.17 83.91 75.62 C 77.22 76.45 70.45 75.79 63.72 76.00 C 61.58 84.13 51.79 88.08 44.34 84.74 C 40.54 83.29 38.32 79.68 36.99 76.02 C 30.97 75.90 24.93 76.13 18.91 75.94 C 16.09 75.86 12.92 75.22 11.16 72.80 C 9.38 70.38 9.94 66.98 11.67 64.70 C 14.07 61.47 17.24 58.93 19.97 55.99 C 20.14 47.10 21.17 37.76 26.09 30.11 C 28.32 26.46 31.58 23.65 34.86 20.99 C 35.21 16.13 36.73 10.74 41.28 8.20 Z" />
    <path className="bell-inner" fill="#4D394B" d=" M 45.05 15.09 C 47.89 13.04 52.15 13.04 54.98 15.12 C 57.75 17.31 57.33 21.20 57.69 24.35 C 61.02 26.60 64.50 28.90 66.69 32.37 C 71.71 39.86 72.23 49.19 72.52 57.92 C 72.33 59.70 73.99 60.71 75.09 61.81 C 77.50 63.79 79.86 65.84 81.92 68.20 C 73.72 68.95 65.48 68.10 57.27 68.68 C 57.08 71.13 57.71 74.00 55.97 76.03 C 53.33 78.95 48.22 79.29 45.23 76.74 C 42.96 74.68 43.54 71.36 43.35 68.63 C 35.01 68.20 26.64 68.86 18.31 68.24 C 20.85 64.81 24.74 62.68 27.21 59.23 C 28.00 51.30 27.85 42.94 31.63 35.66 C 33.82 30.78 38.01 27.30 42.32 24.34 C 42.66 21.18 42.25 17.28 45.05 15.09 Z" />
    </svg>;
    
    return <div className="notifications-icon">
      {svg}
    </div>
  }
});

const StarredChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="starred" />
      <div className="clear"></div>
      <ul>
        {this.props.channels.map ( channel => channel.type == "group" 
          ? <ChannelContainer channel={channel}
                              current_channel_id={this.props.current_channel_id}
                              switchChannel={this.props.switchChannel}
                              key={channel.id} />
          : <DMContainer usernames={channel.usernames}
                         users={this.props.users}
                         current_channel_id={this.props.current_channel_id}
                         channel_id={channel.id}
                         username={this.props.username}
                         switchChannel={this.props.switchChannel}
                         key={channel.id} />
        )}
      </ul>
    </div>
  }
});

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

const DMChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="direct messages"
                      count={this.props.users.length} />
      <div className="clear"></div>
      <ul>
        {this.props.direct_channels.map( direct_channel =>
          <DMContainer channel_id={direct_channel.id}
                       usernames={direct_channel.usernames}
                       users={this.props.users}
                       current_channel_id={this.props.current_channel_id}
                       username={this.props.username}
                       switchChannel={this.props.switchChannel}
                       key={direct_channel.id} />
        )}
      </ul>
    </div>
  }
});

const ChannelsHeader = React.createClass({
  render() {
    let extraClass = this.props.name == "starred" ? " no-hover" : "";
    return <div>
      <div className={"channels-header" + extraClass}>
        <span className="channels-header-name"> 
          { this.props.name == "starred" 
              ? <span className="cs-filled-star">
                  <FilledStar size="18px"
                              color="#ab9ba9" />
                </span> 
              : null } 
          {this.props.name}
        </span>
        
        { this.props.count ? <ChannelsCount count={this.props.count} />
                           : null }
      </div>
      { this.props.name != "starred"
          ? <div className="plus-circle">+</div>
          : null }
    </div> 
  }
});

const ChannelsCount = React.createClass({
  render() {
    return <div className="channels-count">
      ({this.props.count})
    </div>
  }
});

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

const XCircle = React.createClass({
  render() {
    let hidden = this.props.hidden ? "hidden" : "";
    
    return <div className={"x-circle " + hidden}>
      x
    </div>
  }
});

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

const CSUsername = React.createClass({
  render() {
    let headerClass = this.props.header ? " cs-username-header" : "";
    let italicClass = this.props.present === false ? " italic-true" : "";
    
    return <span className={"cs-username" + headerClass + italicClass}>
      {this.props.username}
    </span>
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

ReactDOM.render(<App />, document.getElementById('main'));
