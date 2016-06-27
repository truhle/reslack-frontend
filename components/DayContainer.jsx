import React from 'react';
import DayMessages from './DayMessages';

const DayContainer = React.createClass({
  render() {
    let date = this.props.messages[0].time.monthAndDay;
    
    return <div className="day-container">  
      <br/>
      <DayDivider date={date} />
      <DayMessages messages={this.props.messages}
                   users={this.props.users}
                   toggleMsgStarred={this.props.toggleMsgStarred} />
    </div>
  }
});

const DayDivider = React.createClass({
  render() {
    return <div className="day-divider">
      <div className="messages-divider-line">
        <DayDividerLabel date={this.props.date} />
      </div>
    </div>
  }
});

const DayDividerLabel = React.createClass({
  render() {
    return <div className="day-divider-label">
      {this.props.date}
    </div>
  }
});

export default DayContainer;
