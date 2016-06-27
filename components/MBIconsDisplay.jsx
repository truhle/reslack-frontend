import React from 'react';
import NamePresenceUsername from './NamePresenceUsername';

const MBIconsDisplay = React.createClass({
  getUser(username) {
    return this.props.users.find(u => u.username == username);
  },
  
  render() {
    let usernames = this.props.usernames;
    let getUser = this.getUser;
    let meta = usernames.length == 1
             ? <NamePresenceUsername user={getUser(usernames[0])} />
             : null;
    
    return <div className="mb-icons-display">
      {usernames.map(un => <span className="mb-icon" 
                                 style={{background: getUser(un).icon}}
                                 key={un} /> )}
      {meta}
    </div>
  }
});

export default MBIconsDisplay;
