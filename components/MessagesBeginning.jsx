import React from 'react';
import MBTitle from './MBTitle';
import MBIconsDisplay from './MBIconsDisplay';

const MessagesBeginning = React.createClass({
  addAnd(nameList) {
    let lastComma = nameList.lastIndexOf(",");

    if (lastComma > -1)
      nameList = nameList.slice(0, lastComma) + nameList.slice(lastComma).replace(",", " and");

    return nameList;
  },
  
  render() {
    let beginning;
    let monthAndDay = this.props.timeObj.monthAndDay;
    let currentUsername = this.props.current_user.username;
    
    if (this.props.viewChannel.type == "group") {
      let priv = this.props.viewChannel.private;
      let channelType = priv
                      ? "private channel"
                      : "channel";
      let name = this.props.viewChannel.name;
      let hash = priv ? "" : "#";
      let created_by = this.props.viewChannel.created_by;
      let creator = created_by == currentUsername
                  ? "you"
                  : created_by;
      let purpose = this.props.viewChannel.purpose; 
      let description = name == "random" 
                      ? "A place for non-work related hodge-podge, fliff-flaff, tweedle-dee-tweedle-dum and water-cooler conversation you'd like to keep out of work-related channels."
                      : "This is the very beginning of the " + hash + name + " "
                        + channelType + ", which " + creator + " created on " +
                        monthAndDay + "."; 
      beginning = <div>
        <MBTitle name={name}
                 hash={hash} 
                 private={priv} />
        {description}
        {purpose ? " Purpose: " : null }
        <span className="italic-true">{purpose}</span>    
      </div>;
    }
    else {
      let usernames = this.props.viewChannel.usernames.filter(
        un => un != currentUsername 
      );
      let formattedUsers = this.addAnd(usernames.map(un => "<strong>" + un + "</strong>").join(", "));
      let messageEnd = usernames.length > 1 
                      ? "within this group."
                      : "between the two of you.";
                                    
      let description = "This is the very beginning of your direct message history with " + formattedUsers + ". Direct messages are private " + messageEnd;
      
      function descriptionMarkup() { return {__html: description }; }; 
      
      beginning = <div>
        <MBIconsDisplay usernames={usernames}
                        users={this.props.users}/>
        <div dangerouslySetInnerHTML={descriptionMarkup()}></div>
      </div>;
    };
    
    return <div className="messages-beginning">
      {beginning}
    </div>
  }
});

export default MessagesBeginning;
