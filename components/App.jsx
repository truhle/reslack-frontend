import React from 'react';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';
import auth from '../modules/auth.js';

const App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  getInitialState() {
    let current_user = localStorage.current_user ? JSON.parse(localStorage.current_user) : null;
    
    return {
      current_user: current_user,
      group_prefix: localStorage.group_prefix || "",
      token: localStorage.token || "",
      alertMessage: ""
    }
  },
  
  switchChannel(id, e) {
    $.ajax({
      url: 'http://localhost:3000/users/' + this.state.current_user.id,
      type: 'PATCH',
      data: {current_channel_id: id, token: this.state.token},
      success: (response) => {
        console.log('Channel changed on server', response)
      },
      error: function (response) {
        if (response.status == 401) {
          auth.logout(() => {
            let path = `/${this.state.group_prefix}/signin`;
            this.context.router.push(path);
            this.updateAlert("You were logged out. Please sign in again.");
          })
        }
        else {
          console.log('Server error on saving channel change', response)
        }
      }.bind(this)
    });
    
    let updatedUser = { ...this.state.current_user, current_channel_id: id };
    localStorage.current_user = JSON.stringify(updatedUser);
    this.setState( 
      { current_user: updatedUser }
    );
  },
  
  updateAlert(message) {
    this.setState({alertMessage: message})
  },
  
  updateGroupPrefix(prefix) {
    localStorage.group_prefix = prefix;
    this.setState({group_prefix: prefix});
  },
  
  updatePresence(status) {
    let updatedUser = {...this.state.current_user, present: status };
    console.log("Updating current_user presence", updatedUser);
    localStorage.current_user = JSON.stringify(updatedUser);
    this.setState( 
      { current_user: updatedUser }
    );
  },
  
  setSession(session) {
    localStorage.current_user = JSON.stringify(session.user);
    localStorage.token = session.token;
    this.setState({current_user: session.user, token: session.token});
  },
  
  render() {
    return <DocumentTitle title="Reslack">
      <div>
        {React.cloneElement(
          this.props.children,
          {
            current_user: this.state.current_user,
            alertMessage: this.state.alertMessage,
            updateAlert: this.updateAlert,
            updateGroupPrefix: this.updateGroupPrefix,
            updatePresence: this.updatePresence,
            setSession: this.setSession,
            switchChannel: this.switchChannel
          }
        )}
      </div>
    </DocumentTitle>
  }
});

export default App;
