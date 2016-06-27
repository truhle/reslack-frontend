import React from 'react';
import PresenceIndicator from './PresenceIndicator';

const DMSubtitle = React.createClass({
  render() {
    let status = this.props.present ? "active" : "away";
    
    return <div className="channel-info">
      <PresenceIndicator present={this.props.present}
                         extraClass=" dm-subtitle" />
      <span className="subtitle subtitle-status">{status}</span>
      <span className="subtitle-divider">|</span>
      <span className="subtitle subtitle-full-name">{this.props.fullName}</span>  
    </div>
  }
});

export default DMSubtitle;
