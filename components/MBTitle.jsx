import React from 'react';

const MBTitle = React.createClass({
  render() {
    let extraClass = this.props.private 
                   ? " mb-title-private"
                   : "";
    return <div className={"mb-title" + extraClass}>
      <span className="mb-title-hash">{this.props.hash}</span>{this.props.name}
    </div>
  }
});

export default MBTitle;
