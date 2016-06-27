import React from 'react';
import PresenceIndicator from './PresenceIndicator';

const NamePresenceUsername = React.createClass({
  render() {
    let user = this.props.user;
    
    return <span className="name-presence-username">
      {user.full_name}
      <PresenceIndicator present={user.present}
                         extraClass=" mb-meta" />
      @{user.username}
    </span>
  }
});

export default NamePresenceUsername;
