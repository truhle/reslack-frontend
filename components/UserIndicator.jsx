import React from 'react';
import PresenceIndicator from './PresenceIndicator';
import CSUsername from './CSUsername';

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

export default UserIndicator;
