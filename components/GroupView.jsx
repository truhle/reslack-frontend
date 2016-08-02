import React from 'react';
import ChannelView from './ChannelView';
import ChannelSwitcher from './ChannelSwitcher';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';
import ActionCable from 'actioncable';


let AC = {};
AC.cable = ActionCable.createConsumer("ws:localhost:3000/cable");

const GroupView = React.createClass({
  getInitialState() {

    return {
      // group_id: 1,
      group_name: "",
      // group_name: "MetaTree",
      current_user: {
        username: "taliesin",
        id: 1,
        present: true,
        current_channel_id: 1,
        // unreadChannels: [],
        // unreadMentions: []
      },
      all_channels: [
        // { name: "general", id: 1, private: false, 
        //   starred: false, channel_type: "group", topic: "Add a topic",
        //   created_by: "taliesin", purpose: "This channel is for team wide comminication and announcements.  All team members are in this channel."
        // },
        // { name: "random", id: 2, private: false, 
        //   starred: true, channel_type: "group", topic: "Random stuff", 
        //   created_by: "taliesin", purpose: null
        // },
        // { name: "webschool", id: 3, private: true, 
        //   starred: false, channel_type: "group", topic: "Web, web, web",
        //   created_by: "sean", purpose: null
        // },
        // { usernames: ["bob", "taliesin"], id: 4, starred: false, channel_type: "direct" },
        // { usernames: ["haizop", "taliesin"], id: 5, starred: true, channel_type: "direct" },
        // { usernames: ["sean", "taliesin"], id: 6, starred: false, channel_type: "direct" },
        // { usernames: ["haizop", "sean", "bob", "taliesin"], id: 7, starred: true, channel_type: "direct" }
      ],
      messages: [
        // { timestamp: 1465322440932,
        //   id: 1,
        //   channel_id: 1,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1465322440932,
        //   id: 2,
        //   channel_id: 2,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1465341900077,
        //   id: 3,
        //   channel_id: 4,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1465341900077,
        //   id: 4,
        //   channel_id: 5,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1465341900077,
        //   id: 5,
        //   channel_id: 6,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1465322840932,
        //   id: 6,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "taliesin",
        //   starred: false,
        //   content: "Hey there! From lead message.." },
        // { timestamp: 1465322968820,
        //   id: 7,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "taliesin",
        //   starred: false,
        //   content: "Great to see you, from message" },
        // { timestamp: 1465322998195,
        //   id: 8,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "taliesin",
        //   starred: false,
        //   content: "Great to see you, from message again" },
        // { timestamp: 1465323037518,
        //   id: 9,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "taliesin",
        //   starred: false,
        //   content: "Great to see you, from message this time a very very, very, longish and longish and maybe over a whole line message for your delight and enjoyment!" },
        // { timestamp: 1465341773043,
        //   id: 10,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "taliesin",
        //   starred: false,
        //   content: "Writing again, just a little later now..." },
        // { timestamp: 1465341850077,
        //   id: 11,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "bob",
        //   starred: false,
        //   content: "Yeah, great to see you here!" },
        // { timestamp: 1465341900077,
        //   id: 12,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "bob",
        //   starred: false,
        //   content: "I finally got around to getting on here." },
        // { timestamp: 1465342000077,
        //   id: 13,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "haizop",
        //   starred: true,
        //   content: "Life is beautiful." },
        // { timestamp: 1466542489988,
        //   id: 14,
        //   channel_id: 3,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1466695362113,
        //   id: 15,
        //   channel_id: 7,
        //   beginning: true,
        //   sender: null,
        //   starred: false,
        //   content: "" },
        // { timestamp: 1466784530560,
        //   id: 16,
        //   channel_id: 1,
        //   beginning: false,
        //   sender: "sean",
        //   starred: false,
        //   content: "Loving the summer.." }
      ],
      users: [
        // { username: "taliesin", full_name: "Todd Ruhlen", present: true, 
        //   channels: ["general", "random", "webschool"], icon: "lightcoral" },
        // { username: "bob", full_name: "Bob L.", present: false, 
        //   channels: ["general", "random"], icon: "cornflowerblue" },
        // { username: "haizop", full_name: "Haiz O.", present: true, 
        //   channels: ["general", "random", "webschool"], icon: "goldenrod" },
        // { username: "sean", full_name: "Sean O.", present: true, 
        //   channels: ["general", "random", "webschool"], icon: "plum" }
      ]
    };
  },
  
  componentDidMount() {
    this.getGroupData(1, 2);
    this.setUpSubscription();
  },
  
  addMessage(text, e) {
    let messages = this.state.messages;
    let lastId = messages[messages.length - 1].id;
    let current_user = this.state.current_user;
    
    let message = {
      timestamp: Date.now(),
      group_id: this.state.group_id,
      channel_id: current_user.current_channel_id,
      user_id: current_user.id,
      beginning: false,
      sender: current_user.username,
      content: text
    };
    
    $.ajax({
      url: 'http://localhost:3000/messages',
      type: 'POST',
      data: {message: message},
      success: (response) => {
        console.log('it worked', response);
      }
    });
    
    // message.id = message.timestamp;
    // message.starred = false;
    // 
    // this.setState({ messages: [...messages, message] });
  },
  
  getGroupData(groupId, userId) {
    let url = "http://localhost:3000/groups/" + groupId;
    let self = this;
    $.getJSON(url, {user_id: userId}, function(response) {
      console.log(response);
      self.setState(response);
    });
  },
  
  receiveMessage(message) {
    message = JSON.parse(message)
    // message.starred = false;
    this.setState({ messages: [...this.state.messages, message] });
  },
  
  setUpSubscription() {
    AC.cable.subscriptions.create('MessagesChannel', {
      received(message) {
        return this.receiveMessage(message);
      },
      receiveMessage: this.receiveMessage
    });
  },
  
  switchChannel(id, e) {
    $.ajax({
      url: 'http://localhost:3000/users/' + this.state.current_user.id,
      type: 'PATCH',
      data: {current_channel_id: id},
      success: (response) => {
        console.log('current channel changed', response)
      },
      error: (response) => {
        console.log('error', response)
      }
    });
    this.setState( 
      { current_user: {...this.state.current_user, current_channel_id: id} }
    );
  },
  
  toggleChannelStarred(id, e) {
    console.log("toggling channel star");
    $.ajax({
      url: 'http://localhost:3000/user_channel_stars',
      type: 'POST',
      data: {channel_id: id,
             user_id: this.state.current_user.id},
      success: (response) => {
        console.log('channel star toggled', response)
      },
      error: (response) => {
        console.log('error', response)
      }
    });
    let updatedChannels = this.state.all_channels.map(
      ch => ch.id == id ? {...ch, starred: !ch.starred} : ch
    );
    this.setState({all_channels: updatedChannels});
  },
  
  toggleMsgStarred(id, e) {
    console.log("toggling message star");
    $.ajax({
      url: 'http://localhost:3000/user_message_stars',
      type: 'POST',
      data: {message_id: id,
             user_id: this.state.current_user.id},
      success: (response) => {
        console.log('message star toggled', response)
      },
      error: (response) => {
        console.log('error', response)
      }
    });
    let updatedMsgs = this.state.messages.map(
      msg => msg.id == id ? {...msg, starred: !msg.starred} : msg
    );
    this.setState({messages: updatedMsgs});
  },
  
  render() {
    let current_channel_id = this.state.current_user.current_channel_id;
    let switcher, view;
    if (this.state.all_channels[0] == undefined) {
      switcher = "Hi";
      view = "Testing no group data";
    } 
    else {
      let viewChannel = this.state.all_channels.find(
        ch => ch.id == current_channel_id
      );
      let viewChannelMsgs = this.state.messages.filter(
        m => m.channel_id == current_channel_id
      );
      switcher = <ChannelSwitcher current_user={this.state.current_user}
                                  all_channels={this.state.all_channels}
                                  group_name={this.state.group_name}
                                  users={this.state.users}
                                  switchChannel={this.switchChannel} />;
      view = <ChannelView viewChannel={viewChannel}
                          current_user={this.state.current_user}
                          users={this.state.users}
                          messages={viewChannelMsgs}
                          addMessage={this.addMessage}
                          toggleChannelStarred={this.toggleChannelStarred}
                          toggleMsgStarred={this.toggleMsgStarred} />;
    }
    let channelName = this.props.params.channelName;
    let groupPrefix = this.props.params.groupPrefix;
    
    return <DocumentTitle title={channelName 
                                 ? `${channelName} | ${groupPrefix} Reslack`
                                 : `${groupPrefix} | Reslack`} >
      <div>
        {switcher}
        {view}
      </div>
    </DocumentTitle>
  }
}); 

export default GroupView;
