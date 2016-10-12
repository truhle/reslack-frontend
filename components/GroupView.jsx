import React from 'react';
import ChannelView from './ChannelView';
import ChannelSwitcher from './ChannelSwitcher';
import DocumentTitle from 'react-document-title';
import TeamMenu from './TeamMenu';
import $ from 'jquery';
import ActionCable from 'actioncable';
import auth from '../modules/auth.js';

let AC = {};

const GroupView = React.createClass({
  getInitialState() {

    return {
      group_name: "",
      current_user: {},
      all_channels: [],
      messages: [],
      users: [],
      teamMenuOpen: false
    };
  },
  
  componentDidMount() {
    this.getGroupData(this.props.params.groupPrefix);
  },
  
  componentWillMount() {
    AC.cable = ActionCable.createConsumer("ws:localhost:3000/cable?token=" + auth.getToken());
  },
  
  componentWillUnmount() {
    AC.appearance.unsubscribe();
  },
  
  addMessage(text, e) {
    let messages = this.state.messages;
    let lastId = messages[messages.length - 1].id;
    let current_user = this.props.current_user;
    
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
      data: {message: message, token: auth.getToken(), user_id: current_user.id},
      success: (response) => {
        console.log('it worked', response);
      }
    });
  },
  
  toggleTeamMenu() {
    this.setState({teamMenuOpen: !this.state.teamMenuOpen})
  },
  
  getGroupData(groupPrefix) {
    let url = "http://localhost:3000/groups/" + groupPrefix;
    let current_user = this.props.current_user;
    $.getJSON(url, {user_id: current_user.id, token: auth.getToken()}, function(response) {
      let current_channel_id = current_user.current_channel_id;
      if (!response.all_channels.some( ch => ch.id == current_channel_id )) {
        this.props.switchChannel(response.all_channels[0].id)
      }
      this.setState(response);
      this.setUpSubscriptions(response.all_channels);
    }.bind(this));
  },
  
  receiveMessage(message) {
    message = JSON.parse(message)
    this.setState({ messages: [...this.state.messages, message] });
  },
  
  appearanceSubscription() {
    let self = this;
    AC.appearance = AC.cable.subscriptions.create({channel: "AppearanceChannel", group_id: this.state.group_id}, {
      received(update) {
        console.log("receiving update: ", update);
        let updatedUsers = self.state.users.map(user => {
          return user.id != update.user_id ? user : {...user, present: update.present} 
        });
        self.setState({users: updatedUsers})
        if (self.props.current_user.id == update.user_id)
          self.props.updatePresence(update.present);
      }
    })
  },
  
  setUpSubscriptions(channels) {
    let self = this;
    channels.forEach((channel) => {
      AC.cable.subscriptions.create({channel: 'MessagesChannel', reslack_channel_id: channel.id}, {
        received(message) {
          self.receiveMessage(message);
        }
      });
    });
    this.appearanceSubscription();
  },
    
  toggleChannelStarred(id, e) {
    console.log("toggling channel star");
    $.ajax({
      url: 'http://localhost:3000/user_channel_stars',
      type: 'POST',
      data: {channel_id: id,
             user_id: this.props.current_user.id,
             token: auth.getToken()},
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
             user_id: this.props.current_user.id,
             token: auth.getToken()},
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
    let current_channel_id = this.props.current_user.current_channel_id;
    let switcher, view;
    let firstChannel = this.state.all_channels[0];
    if (firstChannel == undefined) {
      switcher = "Hi";
      view = "Testing no group data";
    } 
    else if (this.state.group_prefix != this.props.params.groupPrefix) {
      switcher = "Hey";
      view = "Testing wrong group data";
    }
    else {
      let viewChannel = this.state.all_channels.find(
        ch => ch.id == current_channel_id
      );
      let viewChannelMsgs = this.state.messages.filter(
        m => m.channel_id == current_channel_id
      );

      switcher = <ChannelSwitcher current_user={this.props.current_user}
                                  all_channels={this.state.all_channels}
                                  group_name={this.state.group_name}
                                  users={this.state.users}
                                  switchChannel={this.props.switchChannel}
                                  toggleTeamMenu={this.toggleTeamMenu} />;
      view = <ChannelView viewChannel={viewChannel}
                          current_user={this.props.current_user}
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
        <TeamMenu current_user={this.props.current_user}
                  open={this.state.teamMenuOpen}
                  groupPrefix={groupPrefix}
                  toggleTeamMenu={this.toggleTeamMenu} />
      </div>
    </DocumentTitle>
  }
}); 

export default GroupView;
