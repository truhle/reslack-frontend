import React from 'react';

const CSUsername = React.createClass({
  render() {
    let headerClass = this.props.header ? " cs-username-header" : "";
    let italicClass = this.props.present === false ? " italic-true" : "";
    
    return <span className={"cs-username" + headerClass + italicClass}>
      {this.props.username}
    </span>
  }
});

export default CSUsername;
