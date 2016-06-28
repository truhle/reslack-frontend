import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import ChannelView from './components/ChannelView';
import ChannelSwitcher from './components/ChannelSwitcher';

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

ReactDOM.render(<App />, document.getElementById('main'));
