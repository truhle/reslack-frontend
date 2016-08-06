import React from 'react';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';

const App = React.createClass({
  getInitialState() {
    // let defaultUser = {id: 1, username: "taliesin", full_name: "Todd R.", present: false, icon: "cornflowerblue", current_channel_id: 1, password_digest: "$2a$10$AynHww91Tu6RJjvqSQ24t.oW7psxPoVpF4VnvFgq3OK...", email: "taliesin@example.com"};
    let current_user = localStorage.current_user ? JSON.parse(localStorage.current_user) : null;
    
    return {
      group_prefix: localStorage.group_prefix || "",
      current_user: current_user
    }
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
    let updatedUser = { ...this.state.current_user, current_channel_id: id };
    localStorage.current_user = JSON.stringify(updatedUser);
    this.setState( 
      { current_user: updatedUser }
    );
    
  },
  
  updateGroupPrefix(prefix) {
    localStorage.group_prefix = prefix;
    this.setState({group_prefix: prefix});
  },
  
  setUser(userObject) {
    localStorage.current_user = JSON.stringify(userObject);
    this.setState({current_user: userObject});
  },
  
  render() {
    return <DocumentTitle title="Reslack">
      <div>
        {React.cloneElement(
          this.props.children,
          {
            current_user: this.state.current_user,
            updateGroupPrefix: this.updateGroupPrefix,
            setUser: this.setUser,
            switchChannel: this.switchChannel
          }
        )}
      </div>
    </DocumentTitle>
  }
});

export default App;
