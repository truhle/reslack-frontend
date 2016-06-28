import React from 'react';

const CSHeaderName = React.createClass({
  render() {
    return <div className="cs-header-name overflow-ellipses">
      {this.props.group_name} 
      <span className="cs-header-or">&or;</span>
    </div>
  }
});

export default CSHeaderName;
