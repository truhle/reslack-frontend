import React from 'react';
import DayContainer from './DayContainer';
import MessagesBeginning from './MessagesBeginning';

const MessagesContainer = React.createClass({
  componentDidMount() {
    var el = this.refs.messagesContainer;
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 0);
  },
  
  componentDidUpdate() {
    let el = this.refs.messagesContainer;
    el.scrollTop = el.scrollHeight;
  },
  
  parseTimestamp(ts) {
    let d = new Date(ts);
    let day = d.getDate();
    let month = d.getMonth();
    let monthAndDay = this.monthToWord(month) + " " +
                      this.getOrdinal(day); 
    let timeString = this.timeNoSeconds(d.toLocaleTimeString());
    let year = d.getFullYear(ts);

    
    return {
      day: day,
      month: month,
      year: year, 
      monthAndDay: monthAndDay,
      timeString: timeString
    };
  },
  
  getOrdinal(n) {
    let s = ["th", "st", "nd", "rd"], v = n % 10; 
    return n + (s[v] || s[0]);
  },
  
  monthToWord(monthNumber) {
    let monthWords = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
    return monthWords[monthNumber];
  },
  
  timeNoSeconds(timeString) {
    return timeString.replace(/:\d+(\s\w\w)(\s\w+)?$/, '$1');
  },
  
  addTimeObject(message) {
    let timeObject = this.parseTimestamp(message.timestamp);
    return {...message, time: timeObject};
  },
  
  addTimeObjects(messages) {
    return messages.map(m => this.addTimeObject(m));
  },
  
  splitByDay(messages) {
    let messagesWithTime = this.addTimeObjects(messages);
    let firstMessage = messagesWithTime[0];
    let rest = messagesWithTime.slice(1, messagesWithTime.length);
    
    return rest.reduce(function(acc, m) {
      let currentDay = acc[acc.length - 1];
      let lastMessage = currentDay[currentDay.length - 1];
      if (lastMessage.time.day == m.time.day
          && lastMessage.time.month == m.time.month
          && lastMessage.time.year == m.time.year) {
        return acc.slice(0, acc.length - 1).concat([currentDay.concat([m])]);
      }
      else {
        return acc.concat([[m]]);
      }
    }, [[firstMessage]]);
  },
  
  makeDayContainers(messages) {
    return this.splitByDay(messages).map(
      (ary,i) => <DayContainer key={i}
                               messages={ary}
                               users={this.props.users}
                               toggleMsgStarred={this.props.toggleMsgStarred} /> 
    );
  },
  
  render() {
    let firstMsg = this.props.messages[0];
    let beginningTimeObj = this.parseTimestamp(firstMsg.timestamp);
    let beginning = firstMsg.beginning == true 
                  ? <MessagesBeginning viewChannel={this.props.viewChannel}
                                       timeObj={beginningTimeObj} 
                                       current_user={this.props.current_user}
                                       users={this.props.users} />
                  : null;
    let messages = firstMsg.beginning == true 
                 ? this.props.messages.slice(1) 
                 : this.props.messages;
    let dayContainers = messages.length > 0 
                      ? this.makeDayContainers(messages)
                      : null;
    
    return <div className="messages-container"
                ref="messagesContainer">
      {beginning}
      {dayContainers}
    </div>
  }
});

export default MessagesContainer;
