import React from 'react';

const LeadMessageGutter = React.createClass({
  render() {
    let icon = this.props.users.find(u => u.username == this.props.sender).icon;
    
    return <div className="lead-message-gutter message-gutter"
                style={{background: icon}}>
    </div>
  }
});

export default LeadMessageGutter;
