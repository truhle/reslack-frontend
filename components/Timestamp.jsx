import React from 'react';

const Timestamp = React.createClass({
  truncateTime(time) {
    return time.replace(/\sPM|\sAM/, "");
  },
  
  render() {
    let time = this.props.lead == true ? this.props.time :
                                         this.truncateTime(this.props.time);
    let hidden = this.props.lead == true ? "" : " hidden";
                              
    return <span className={"timestamp" + hidden}>
      {time}
    </span>
  }
});

export default Timestamp;
