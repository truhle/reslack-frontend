import React from 'react';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';

const App = React.createClass({
  getInitialState() {
    return {
      group_id: Number(localStorage.group_id) || null,
      group_prefix: localStorage.group_prefix || "",
      current_user: localStorage.current_user || {}
    }
  },
  
  ensureGroupId(groupPrefix) {
    if (groupPrefix == this.state.group_prefix && this.state.group_id) {
      return this.state.group_id;
    }
    else {
      let url = "http://localhost:3000/group_ids/" + groupPrefix;
      let self = this;
      $.getJSON(url, response => {
        self.updateGroupInfo(response.group_id, groupPrefix);
      });
    }
  },
  
  updateGroupInfo(id, prefix) {
    localStorage.group_id = id;
    localStorage.group_prefix = prefix;
    this.setState({group_id: id, group_prefix: prefix});
  },
  
  setUser(userObject) {
    localStorage.current_user = userObject;
    this.setState({current_user: userObject});
  },
  
  render() {
    return <DocumentTitle title="Reslack">
      <div>
        {React.cloneElement(
          this.props.children,
          {
            group_id: this.state.group_id,
            current_user: this.state.current_user,
            updateGroupInfo: this.updateGroupInfo,
            setUser: this.setUser,
            ensureGroupId: this.ensureGroupId
          }
        )}
      </div>
    </DocumentTitle>
  }
});

export default App;
