import React from 'react';

const PresenceIndicator = React.createClass({
  render() {
    let extraClass = "";
    
    if (this.props.extraClass) {
      extraClass = this.props.extraClass;
    }
    
    return <div className={"presence presence-" + this.props.present + extraClass}>
    </div>
  }
});

export default PresenceIndicator;
