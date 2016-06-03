import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';

const App = React.createClass({
  getInitialState() {
    return {
      group_name: "MetaTree",
      current_user: {
        name: "taliesin",
        present: true,
        current_channel: "general",
        channels: [
          { name: "general", private: false, starred: false },
          { name: "random", private: false, starred: true },
          { name: "webschool", private: true, starred: false }
        ],
        direct_channels: [
          { names: ["bob"], starred: false },
          { names: ["haizop"], starred: true },
          { names: ["sean"], starred: false },
          { names: ["haizop", "sean", "joe", "larry", "gary"], starred: true }
        ],
        unreadChannels: [],
        unreadMentions: []
      },
      users: {
        "bob": { present: false },
        "haizop": { present: true },
        "sean": { present: true }
      }
    };
  },
  
  switchChannel(name, e) {
    this.setState( 
      { current_user: {...this.state.current_user, current_channel: name} }
    );
  },
  
  render() {
    return <div>
      <ChannelSwitcher current_user={this.state.current_user}
                       group_name={this.state.group_name}
                       users={this.state.users}
                       switchChannel={this.switchChannel} />
      <ChannelView />
    </div>
  }
}); 
  
const ChannelView = React.createClass({
  render() {
    return <div>
      <ChannelHeader />
      <MessagesContainer />
      <ChannelFooter />
    </div>
  }
});

const ChannelFooter = React.createClass({
  render() {
    return <div className="channel-footer">
      <MessageInputContainer />
      <NotificationBar />
    </div>
  }
});

const MessageInputContainer = React.createClass({
  getInitialState() {
    return { message: "" };
  },
  
  updateMessage(e) {
    this.setState({ message: e.target.value })
  },
  
  render() {
    return <div className="message-input-container">
      <pre className="resize-mirror"><span>{this.state.message}</span><br/></pre>
      <MessageInput updateMessage={this.updateMessage} />
      <PrimaryFileButton />
    </div>
  }
});

const PrimaryFileButton = React.createClass({
  render() {
    let plus = <svg className="plus" xmlns="http://www.w3.org/2000/svg" 
                    version="1.1" viewBox="0 0 32 32"
                    width="16px"
                    height="16px">
      <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>
    return <div className="primary-file-button">
      {plus}
    </div>
  }
});

const MessageInput = React.createClass({
  render() {
    return <textarea className="message-input" 
                     rows="1"
                     onInput={this.props.updateMessage}></textarea>
  }
});

const NotificationBar = React.createClass({
  render() {
    return <div className="notification-bar">
      notification bar
    </div>
  }
});

const MessagesContainer = React.createClass({
  render() {
    return <div className="messages-container">
      <DayContainer />
      
    </div>
  }
});

const DayContainer = React.createClass({
  render() {
    return <div className="day-container">  
      <br/>
      <DayDivider date="May 23rd" />
      <DayMessages />
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

const DayMessages = React.createClass({
  render() {
    return <div className="day-messages">
      <MessageBlock />
      <MessageBlock />
      <MessageBlock />
      <MessageBlock />
      <MessageBlock />
    </div>
  }
});

const MessageBlock = React.createClass({
  render() {
    return <div className="message-block">
      <LeadMessage time="12:00 PM"
                   sender="taliesin"
                   starred={false}
                   content="Hey there! From lead message.." />
      <Message time="12:01 PM"
               sender="taliesin"
               starred={false}
               content="Great to see you, from message"/>
      <Message time="12:02 PM"
               sender="taliesin"
               starred={false}
               content="Great to see you, from message again"/>
      <Message time="12:02 PM"
               sender="taliesin"
               starred={false}
               content="Great to see you, from message this time a very very, very, longish and longish and maybe over a whole line message for your delight and enjoyment!"/>
    </div>
  }
});

const LeadMessage = React.createClass({
  getInitialState() {
    return {
      starred: this.props.starred
    };
  },
  
  toggleStar() {
    this.setState({starred: !this.state.starred});
  },
  
  render() {
    return <div className="message lead-message">
      <LeadMessageGutter sender={this.props.sender} />
      <LeadMessageHeader sender={this.props.sender} 
                         time={this.props.time}
                         starred={this.state.starred}
                         toggleStar={this.toggleStar} />
      <MessageContent content={this.props.content} />
    </div>
  }
});

const LeadMessageHeader = React.createClass({
  render() {
    return <div className="lead-message-header">
      <Sender sender={this.props.sender} />
      <Timestamp time={this.props.time}
                 lead={true} />
      <StarToggle starred={this.props.starred}
                  toggleStar={this.props.toggleStar} />
    </div>
  }
});

const Sender = React.createClass({
  render() {
    return <span className="sender">
      {this.props.sender}
    </span>
  }
});

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

const MessageContent = React.createClass({
  render() {
    return <div className="message-content">
      {this.props.content}
    </div>
  }
});

const Message = React.createClass({
  getInitialState() {
    return {
      starred: this.props.starred
    };
  },
  
  toggleStar() {
    this.setState({starred: !this.state.starred});
  },
  
  render() {
    return <div className="message">
      <MessageGutter time={this.props.time}
                     user={this.props.user}
                     starred={this.state.starred}
                     toggleStar={this.toggleStar} />
      {this.props.content}
    </div>
  }
});

const LeadMessageGutter = React.createClass({
  render() {
    return <div className="lead-message-gutter message-gutter"
    sender="taliesin">
      {this.props.sender}
    </div>
  }
});

const MessageGutter = React.createClass({
  render() {
    return <div className="message-gutter">
      <Timestamp time={this.props.time} lead={false} />
      <StarToggle starred={this.props.starred} 
                  toggleStar={this.props.toggleStar} />
    </div>
  }
});

const ChannelHeader = React.createClass({
  getInitialState() {
    return {
      starred: false
    };
  },
  
  toggleStar() {
    this.setState({starred: !this.state.starred});
  },
  
  render() {
    return <div className="channel-header">
      <ChannelTitle name="webschool" 
                    private={true}
                    members={5}
                    topic="Add a topic"
                    starred={this.state.starred}
                    toggleStar={this.toggleStar} />
      <MoreItems />
      <ShowStarredItems />
      <ShowMentions />
      <SearchBar />
      <div className="divider-bar"></div>
      <ShowChannelDetails />
      <ChannelSettings />
    </div>
  }
});

const ChannelTitle = React.createClass({
  toggleStarToggle() {
    if (this.refs.myStarToggle != null) {
      ReactDOM.findDOMNode(this.refs.myStarToggle).classList.toggle("hidden");
    }
  },
  
  render() {
    return <div className="channel-title overflow-ellipses">
      <ChannelTypeIndicator private={this.props.private}
                            size="13.2px"
                            extraClass="CH" />
      <span className="channel-header-name">{this.props.name}</span>
      <StarToggle ref={this.props.starred ? null : "myStarToggle"}
                  starred={this.props.starred}
                  toggleStar={this.props.toggleStar} /> 
      <br />
      <MemberCount members={this.props.members} />
      <span className="topic-divider">|</span>
      <Topic topic={this.props.topic}
             toggleStarToggle={this.toggleStarToggle} />
    </div>
  }
});

const StarToggle = React.createClass({
  render() {
    if (this.props.starred == false) {
      var star = <EmptyStar size="13px" />;
    } else {
      var star = <FilledStar className="filled-star" 
                             size="16px"
                             color="#F8CF34" />
    }
    
    return <div className="star-toggle" 
                onClick={this.props.toggleStar}>
      {star}
    </div>
  }
});

const EmptyStar = React.createClass({
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 80 80" version="1.1"
                height={this.props.size} 
                width={this.props.size}>
    <path d="m19.583 69.64c-1.5268-1.5268-1.5948-1.8738-1.3168-6.7188 0.19271-3.358 0.87239-6.7152 1.9833-9.7963 2.7179-7.5378 2.8283-6.8796-1.6523-9.8469-8.446-5.594-12.665-11.43-10.921-15.109 1.3962-2.945 4.791-3.987 14.011-4.3l8.3083-0.28178 0.66231-2.5748c1.848-7.183 4.501-12.924 7.087-15.335 4.985-4.6473 10.5 1.3528 14.097 15.335l0.66231 2.5748 8.3083 0.28178c9.2203 0.31271 12.615 1.3547 14.012 4.3006 1.7439 3.6788-2.4749 9.515-10.922 15.109-4.4806 2.9672-4.3702 2.3091-1.6523 9.8469 1.1109 3.0811 1.7906 6.4382 1.9833 9.7963 0.27804 4.8449 0.21004 5.1919-1.3168 6.7188-0.886 0.885-2.182 1.609-2.882 1.609-3.521 0-10.761-4.024-16.129-8.964l-2.656-2.445-2.656 2.445c-5.368 4.94-12.608 8.964-16.129 8.964-0.69944 0-1.9962-0.72449-2.8817-1.61zm10.305-7.4196c2.0767-1.5288 5.345-4.2006 7.2629-5.9375 1.918-1.736 3.763-3.157 4.099-3.157 0.33647 0 2.181 1.4211 4.0989 3.1579 8.5551 7.7475 13.465 10.279 13.879 7.1546 0.09103-0.6875-1.1179-4.9062-2.6866-9.375s-2.9992-8.5685-3.1789-9.1107c-0.23367-0.70486 1.1549-1.9512 4.8741-4.375 5.883-3.833 10.514-7.829 10.514-9.071 0-1.7045-2.5502-2.1894-11.011-2.0935-4.6648 0.05286-8.7026-0.14463-8.9727-0.43887-0.27-0.295-1.397-3.672-2.504-7.505-2.014-6.972-3.803-10.843-5.012-10.843-1.2091 0-2.9983 3.8708-5.0121 10.843-1.1071 3.8331-2.234 7.2101-2.5041 7.5043-0.27016 0.29424-4.3079 0.49174-8.9727 0.43887-8.461-0.096-11.011 0.389-11.011 2.094 0 1.2424 4.6309 5.2384 10.513 9.072 3.73 2.4308 5.107 3.6681 4.869 4.375-0.18254 0.54211-1.6547 4.8119-3.2714 9.4883-1.6168 4.6765-2.7619 8.9655-2.5449 9.5312 0.65154 1.6979 2.5881 1.1819 6.5722-1.751z"/>
    </svg>
  }
});

const FilledStar = React.createClass({
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg"        
                viewBox="0 0 100 100"
                version="1.1" 
                height={this.props.size} 
                width={this.props.size} 
                fill={this.props.color}>
     <path d="m27.959 85.496c-4.1182-1.6654-3.3414-11.8 1.9253-25.119 0.3093-0.78219-0.56663-1.7013-3.5413-3.7157-4.8648-3.2945-10.325-8.3776-11.556-10.758-1.2946-2.5034-1.2289-5.1985 0.16473-6.7627 2.2512-2.5266 5.0953-3.2225 14.415-3.5269l8.8512-0.28911 0.42181-2.2667c1.7783-9.5562 7.4386-18.829 11.493-18.829 1.6991 0 4.8067 2.7579 6.5887 5.8471 1.4415 2.499 4.2783 10.228 4.9929 13.604l0.34684 1.6384 8.602 0.28364c11.658 0.3844 15.79 2.1902 15.79 6.9012 0 3.5248-5.1728 9.1893-13.259 14.519l-3.5714 2.3541 1.0035 2.2701c2.1162 4.7876 4.0144 12.405 4.0937 16.428 0.13536 6.8684-2.406 9.0391-8.2932 7.0837-3.7856-1.2574-10.097-5.2624-13.538-8.5904l-2.6267-2.5407-3.3108 2.8002c-5.044 4.2662-9.0063 6.7866-12.722 8.0924-3.6981 1.2998-4.3381 1.3586-6.2711 0.57694z"/>
    </svg>
  }
});

const MemberCount = React.createClass({
  render() {
    let pluralized = this.props.members == 1 ? "member" : "members";
    
    return <div className="member-count">
      {this.props.members} {pluralized}
    </div>
  }
});

const Topic = React.createClass({
  render() {
    return <div className="topic" 
                onMouseOver={this.props.toggleStarToggle}
                onMouseOut={this.props.toggleStarToggle}>
      {this.props.topic}
    </div>
  }
});

const MoreItems = React.createClass({
  render() {
    let svg = <svg xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 80 80" version="1.1"  
                   height="22" 
                   width="22">
     <path d="m36.781 67.036c-3.582-3.582-1.0884-9.6023 3.9773-9.6023s7.5593 6.0203 3.9773 9.6023c-2.2679 2.2679-5.6867 2.2679-7.9545 0zm0-23.75c-2.3111-2.3111-2.2409-5.3552 0.1792-7.7754 1.2469-1.2469 2.4528-1.8269 3.7981-1.8269 2.7839 0 5.625 2.9316 5.625 5.8042 0 4.8904-6.0979 7.3024-9.6023 3.7981zm1.6827-22.388c-3.8101-1.6574-4.5411-6.0994-1.5035-9.137 2.4563-2.4563 5.1399-2.4563 7.5962 0 3.0903 3.0903 2.2974 7.518-1.6408 9.1635-2.4868 1.0391-1.9954 1.042-4.4518-0.02651z"/>
    </svg>;
    
    return <div className="more-items">
      {svg}  
    </div>
  } 
});

const ShowStarredItems = React.createClass({
  getInitialState() {
    return {open: false};
  },
  
  toggleStarredItems() {
    this.setState({open: !this.state.open});
  },
  
  render() {
    let open = this.state.open ? "open" : "";
      
    return <div className={"show-starred-items header-icon " + open}
                onClick={this.toggleStarredItems}>
      <EmptyStar size="21px" />
    </div>
  }
});

const ShowMentions = React.createClass({
  getInitialState() {
    return {open: false};
  },
  
  toggleStarredItems() {
    this.setState({open: !this.state.open});
  },
  
  render() {
    let open = this.state.open ? "open" : "";
    let at_symbol = <svg xmlns="http://www.w3.org/2000/svg" 
                         viewBox="0 0 75 75" version="1.1"
                         width="20" 
                         height="20">
     <path d="m30.172 70.346c-16.872-3.842-28.484-20.732-25.912-37.69 2.7618-18.205 20.089-31.125 38.084-28.396 6.8163 1.0338 13.963 4.6463 18.84 9.5228 11.006 11.006 13.446 30.639 4.5521 36.63-4.3328 2.9184-10.752 2.4307-14.801-1.1245l-2.174-1.9088-1.9219 1.6172c-2.633 2.217-8.053 3.724-11.393 3.169-7.685-1.277-12.544-6.956-12.548-14.665-0.003-6.0173 2.7214-10.521 8.0398-13.292 3.5623-1.8556 9.7133-1.8355 13.281 0.04336 1.4609 0.76932 2.6562 1.1319 2.6562 0.80569 0-0.88353 1.8408-2.5573 2.8125-2.5573 0.46652 0 1.2902 0.44196 1.8304 0.98214 0.799 0.799 0.982 2.61 0.982 9.719 0 9.5778 0.53892 11.615 3.42 12.928 5.496 2.503 9.705-1.309 9.705-8.79 0-12.286-9-23.891-20.94-27.001-24.193-6.3012-44.212 20.261-31.269 41.488 7.3823 12.108 21.794 16.88 35.01 11.593 4.7448-1.8982 6.1207-1.6547 6.4561 1.1429 0.16277 1.3575-0.23458 1.8424-2.4259 2.9603-6.3499 3.2395-15.414 4.3881-22.284 2.8237zm12.796-25.234c2.6299-1.8726 4.1205-5.2843 3.7489-8.5806-0.59224-5.2543-5.0099-8.8315-10.186-8.2481-12.043 1.3574-10.407 19.38 1.6703 18.4 1.623-0.13161 3.7118-0.8202 4.7667-1.5714z"/>
    </svg>;
      
    return <div className={"show-mentions header-icon " + open}
                onClick={this.toggleStarredItems}>
      {at_symbol}
    </div>
  }
});

const SearchBar = React.createClass({
  render() {
    return <input type="text" placeholder="Search" className="search-bar" />
  }
});

const ShowChannelDetails = React.createClass({
  getInitialState() {
    return {open: false};
  },
  
  toggleStarredItems() {
    this.setState({open: !this.state.open});
  },
  
  render() {
    let open = this.state.open ? "open" : "";
    
    let channelDetailsIcon = <svg xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 85 85" version="1.1" 
                                  height="22.5" 
                                  width="22.5">
      <path d="m11.13 73.984c-1.8601-0.984-3.1769-2.301-4.1606-4.161-1.4287-2.702-1.4393-2.894-1.4393-26.275s0.01054-23.573 1.4392-26.275c0.9837-1.8602 2.3006-3.1771 4.1608-4.1608l2.7216-1.4392h29.178 29.178l2.7216 1.4392c1.8602 0.9837 3.1771 2.3006 4.1608 4.1608 1.4287 2.7017 1.4392 2.894 1.4392 26.275s-0.0106 23.573-1.4392 26.275c-0.9837 1.8602-2.3006 3.1771-4.1608 4.1608l-2.7216 1.4392h-29.178-29.178l-2.7216-1.4392zm31.587-30.436v-25.938l-13.433-0.16912c-14.394-0.18122-16.223 0.10646-17.423 2.7408-0.97597 2.142-0.98485 44.57-0.0098 46.71 1.1943 2.6211 2.578 2.8405 17.116 2.7133l13.75-0.12024v-25.938zm29.277 25.556c0.83764-0.38166 1.8352-1.3793 2.2169-2.2169 0.97285-2.1352 0.96181-44.567-0.0122-46.705-1.164-2.5546-3.1606-2.9294-14.618-2.7437l-10.613 0.173-0.164 25.311c-0.08991 13.921-0.02842 25.664 0.13664 26.094 0.39568 1.0311 20.813 1.1092 23.054 0.08815zm-16.732-15.288c-0.54018-0.54018-0.98214-1.3638-0.98214-1.8304 0-0.46652 0.44196-1.2902 0.98214-1.8304 1.4072-1.4072 11.629-1.4072 13.036 0 1.2466 1.2466 1.2466 2.4141 0 3.6607-1.4072 1.4072-11.629 1.4072-13.036 0zm0-11.25c-0.54018-0.54018-0.98214-1.3638-0.98214-1.8304 0-2.1139 1.863-2.8125 7.5-2.8125 4.1991 0 5.7728 0.23714 6.5178 0.98214 1.2466 1.2466 1.2466 2.4141 0 3.6607-1.4072 1.4072-11.629 1.4072-13.036 0zm0-11.25c-0.54018-0.54018-0.98214-1.3638-0.98214-1.8304 0-2.1139 1.863-2.8125 7.5-2.8125s7.5 0.69863 7.5 2.8125-1.863 2.8125-7.5 2.8125c-4.1991 0-5.7729-0.23714-6.5179-0.98214z"/>
    </svg>;
    
    return <div className={"show-channel-details header-icon " + open}
                onClick={this.toggleStarredItems}>
      {channelDetailsIcon}
    </div> 
  }
});

const ChannelSettings = React.createClass({  
  render() {  
    let channelSettingsIcon = <svg xmlns="http://www.w3.org/2000/svg" 
                                   viewBox="0 0 125 125" version="1.1"
                                   height="20"  
                                   width="20">
     <path d="m56.562 118c-4.751-1.6607-7.7568-5.2469-9.4661-11.294-0.56134-1.9859-1.2515-3.7534-1.5337-3.9278-0.28218-0.1744-2.2355 0.55243-4.3408 1.6152-6.9328 3.4996-12.796 3.0316-17.874-1.4267-5.9119-5.1907-7.1772-12.089-3.5042-19.102 1.1172-2.1332 2.0312-4.2518 2.0312-4.7079 0-0.47268-1.6446-1.3273-3.8236-1.9871-5.309-1.612-8.2017-3.89-10.25-8.077-1.5307-3.128-1.6803-3.999-1.4101-8.209 0.25128-3.9154 0.61155-5.15 2.1356-7.3185 2.3491-3.3423 5.076-5.1579 9.6925-6.4532 2.0299-0.56957 3.8249-1.2525 3.9887-1.5176 0.16385-0.26511-0.68753-2.5383-1.892-5.0515-2.6448-5.5187-2.8239-8.8419-0.72029-13.359 2.6665-5.7261 7.9627-9.2896 13.88-9.3389 3.0976-0.02582 4.4928 0.33813 7.6654 1.9997 2.1332 1.1172 4.2518 2.0312 4.7079 2.0312 0.47267 0 1.3273-1.6446 1.9871-3.8236 1.6432-5.4271 4.0483-8.4631 8.2157-10.371 3.0058-1.3761 4.0796-1.5463 8.1201-1.287 3.8581 0.2476 5.1034 0.61309 7.2648 2.1322 3.3423 2.3491 5.1579 5.076 6.4532 9.6925 0.56958 2.0299 1.2525 3.8249 1.5176 3.9887 0.26511 0.16385 2.5383-0.68753 5.0515-1.892 5.5187-2.6448 8.8419-2.8239 13.359-0.72029 5.7321 2.6693 9.3034 7.9754 9.3442 13.883 0.0214 3.0959-0.34594 4.5003-2.005 7.6654-1.1172 2.1313-2.0312 4.2483-2.0312 4.7045 0 0.47267 1.6446 1.3273 3.8236 1.9871 7.7158 2.3362 11.783 7.4141 11.795 14.728 0.0143 8.1876-3.7639 13.001-12.042 15.341-1.9859 0.56134-3.7534 1.2515-3.9278 1.5337-0.1744 0.28218 0.55243 2.2355 1.6152 4.3408 3.4996 6.9328 3.0316 12.796-1.4267 17.874-5.1907 5.9119-12.089 7.1772-19.102 3.5042-2.1332-1.1172-4.2518-2.0312-4.7079-2.0312-0.47268 0-1.3273 1.6446-1.9871 3.8236-1.572 5.1921-3.8773 8.172-7.8557 10.154-3.5858 1.7869-9.087 2.1722-12.747 0.89284zm9.9787-9.4803c0.81639-0.81639 2.0752-3.4683 2.7973-5.8931 1.5113-5.0746 3.3078-6.9761 7.7718-8.226 2.8202-0.78961 2.9954-0.75171 8.31 1.7984 6.3173 3.0312 7.8998 2.9839 10.803-0.32318 2.439-2.781 2.393-4.307-0.285-9.626-2.417-4.799-2.693-7.187-1.177-10.187 1.767-3.498 3.395-4.721 8.169-6.139 5.56-1.651 7.07-3.192 7.07-7.224 0-3.6037-1.6212-5.2225-7.0347-7.024-5.5333-1.8414-7.0801-3.1781-8.3541-7.2197l-1.0607-3.365 2.6248-5.4702c3.0524-6.3613 3.0083-7.937-0.3034-10.845-2.777-2.438-4.303-2.392-9.622 0.286-4.799 2.417-7.187 2.693-10.187 1.177-3.498-1.767-4.721-3.395-6.139-8.171-1.651-5.56-3.192-7.068-7.224-7.068-3.6037 0-5.2225 1.6212-7.024 7.0347-1.8414 5.5333-3.1781 7.0801-7.2197 8.3541l-3.365 1.0607-5.4702-2.6248c-6.3613-3.0524-7.937-3.0083-10.845 0.3034-2.4379 2.7767-2.3925 4.3024 0.2863 9.6218 2.4168 4.799 2.6927 7.1873 1.1769 10.187-1.7671 3.4974-3.3959 4.721-8.1714 6.1387-5.559 1.651-7.067 3.192-7.067 7.224 0 3.6912 1.7525 5.3631 7.3774 7.0383 5.0746 1.5113 6.9761 3.3078 8.226 7.7718 0.78962 2.8202 0.75171 2.9954-1.7984 8.31-3.0312 6.3173-2.9839 7.8998 0.32317 10.803 2.7767 2.4379 4.3024 2.3926 9.6218-0.28631 4.799-2.4168 7.1873-2.6927 10.187-1.1769 3.4974 1.7671 4.721 3.3959 6.1387 8.1714 1.6505 5.5597 3.1921 7.068 7.2242 7.068 2.0684 0 3.1272-0.37061 4.241-1.4844zm-9.207-24.786c-6.183-1.56-11.941-6.397-14.714-12.361-1.381-2.971-1.655-4.44-1.655-8.873 0-6.5035 1.7818-10.904 6.2065-15.329 4.4247-4.4247 8.8255-6.2065 15.329-6.2065s10.904 1.7818 15.329 6.2065c4.4247 4.4247 6.2065 8.8255 6.2065 15.329 0 4.4333-0.27396 5.9017-1.6553 8.8728-2.0911 4.4976-6.4675 8.9035-10.826 10.899-3.8013 1.7403-10.421 2.4211-14.22 1.4626zm10.854-10.474c2.6967-1.4088 3.6626-2.3747 5.0714-5.0714 2.2229-4.255 2.2229-7.1218 0-11.377-1.4088-2.6967-2.3747-3.6626-5.0714-5.0714-4.255-2.2229-7.1218-2.2229-11.377 0-2.6967 1.4088-3.6626 2.3747-5.0714 5.0714-2.2229 4.255-2.2229 7.1218 0 11.377 1.4088 2.6967 2.3747 3.6626 5.0714 5.0714 4.255 2.2229 7.1218 2.2229 11.377 0z"/>
    </svg>;
    
    return <div className="channel-settings">
      {channelSettingsIcon}
    </div> 
  }
});


const ChannelSwitcher = React.createClass({
  render() {
    return <div className="channel-switcher">
      <CSHeader group_name={this.props.group_name}
                username={this.props.current_user.name}
                present={this.props.current_user.present} />
      <ChannelsScroller current_user={this.props.current_user}
                        users={this.props.users}
                        switchChannel={this.props.switchChannel} />
    </div>
  }
});

const ChannelsScroller = React.createClass({
  getStarredChannels(channels1, channels2) {
    return channels1.concat(channels2).filter(channel => channel.starred);
  },
  
  getUnstarredChannels(channels) {
    return channels.filter(channel => !channel.starred);
  },
  
  render() {
    let current_channel = this.props.current_user.current_channel;
    let channels = this.props.current_user.channels;
    let direct_channels = this.props.current_user.direct_channels;
    
    let channels_count = channels.length;
    
    let starred_channels = this.getStarredChannels(channels, direct_channels);
    let unstarred_channels = this.getUnstarredChannels(channels);
    let unstarred_direct_channels = this.getUnstarredChannels(direct_channels);
    
    return <div className="channels-scroller">
      <StarredChannelsContainer current_channel={current_channel}
                                channels={starred_channels}
                                users={this.props.users}
                                switchChannel={this.props.switchChannel}/>
      <ChannelsContainer current_channel={current_channel}
                         channels={unstarred_channels}
                         count={channels_count}
                         switchChannel={this.props.switchChannel} />
      <DMChannelsContainer current_channel={current_channel}
                           direct_channels={unstarred_direct_channels}
                           users={this.props.users}
                           switchChannel={this.props.switchChannel} />
    </div>
  }
});

const CSHeader = React.createClass({
  render() {
    return <div className="cs-header">
        <CSHeaderName group_name={this.props.group_name} />
        <NotificationsIcon />
        <UserIndicator present={this.props.present} 
                       username={this.props.username} /> 
        <div className="clear"></div>
    </div>
  }
});

const CSHeaderName = React.createClass({
  render() {
    return <div className="cs-header-name">
      <span className="overflow-ellipses">{this.props.group_name}</span> <span className="cs-header-or">&or;</span>
    </div>
  }
});

const UserIndicator = React.createClass({
  render() {
    return <div>
      <PresenceIndicator present={this.props.present} header={true} />
      <CSUsername present={this.props.present} 
                  username={this.props.username}
                  header={true} />
    </div>
  }
});

const NotificationsIcon = React.createClass({
  render() {
    let svg = 
    <svg width="20px" height="20px" viewBox="0 0 98 98" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path className="bell" fill="#ab9ba9" d=" M 41.28 8.20 C 47.18 4.96 55.28 5.17 60.58 9.49 C 63.88 12.22 64.70 16.63 65.18 20.65 C 70.81 24.51 75.29 30.06 77.32 36.62 C 79.44 42.85 79.86 49.47 80.03 56.00 C 83.29 59.69 87.87 62.53 89.66 67.29 C 91.07 71.19 87.78 75.17 83.91 75.62 C 77.22 76.45 70.45 75.79 63.72 76.00 C 61.58 84.13 51.79 88.08 44.34 84.74 C 40.54 83.29 38.32 79.68 36.99 76.02 C 30.97 75.90 24.93 76.13 18.91 75.94 C 16.09 75.86 12.92 75.22 11.16 72.80 C 9.38 70.38 9.94 66.98 11.67 64.70 C 14.07 61.47 17.24 58.93 19.97 55.99 C 20.14 47.10 21.17 37.76 26.09 30.11 C 28.32 26.46 31.58 23.65 34.86 20.99 C 35.21 16.13 36.73 10.74 41.28 8.20 Z" />
    <path className="bell-inner" fill="#4D394B" d=" M 45.05 15.09 C 47.89 13.04 52.15 13.04 54.98 15.12 C 57.75 17.31 57.33 21.20 57.69 24.35 C 61.02 26.60 64.50 28.90 66.69 32.37 C 71.71 39.86 72.23 49.19 72.52 57.92 C 72.33 59.70 73.99 60.71 75.09 61.81 C 77.50 63.79 79.86 65.84 81.92 68.20 C 73.72 68.95 65.48 68.10 57.27 68.68 C 57.08 71.13 57.71 74.00 55.97 76.03 C 53.33 78.95 48.22 79.29 45.23 76.74 C 42.96 74.68 43.54 71.36 43.35 68.63 C 35.01 68.20 26.64 68.86 18.31 68.24 C 20.85 64.81 24.74 62.68 27.21 59.23 C 28.00 51.30 27.85 42.94 31.63 35.66 C 33.82 30.78 38.01 27.30 42.32 24.34 C 42.66 21.18 42.25 17.28 45.05 15.09 Z" />
    </svg>;
    
    return <div className="notifications-icon">
      {svg}
    </div>
  }
});

const StarredChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="starred" />
      <div className="clear"></div>
      <ul>
        {this.props.channels.map ( channel => channel.name ? 
            <ChannelContainer name={channel.name}
                              private={channel.private}
                              current_channel={this.props.current_channel}
                              switchChannel={this.props.switchChannel}
                              key={channel.name} /> : 
            <DMContainer names={channel.names}
                         users={this.props.users}
                         current_channel={this.props.current_channel}
                         switchChannel={this.props.switchChannel}
                         key={channel.names} />
        )}
      </ul>
    </div>
  }
});

const ChannelsContainer = React.createClass({
   
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="channels" 
                      count={this.props.count} />
      <div className="clear"></div>
      <ul>
        {this.props.channels.map( channel =>
          <ChannelContainer name={channel.name}
                            private={channel.private}
                            current_channel={this.props.current_channel}
                            switchChannel={this.props.switchChannel}
                            key={channel.name} />
        )}
      </ul>
    </div>
  }
});

const DMChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="direct messages"
                      count={Object.keys(this.props.users).length} />
      <div className="clear"></div>
      <ul>
        {this.props.direct_channels.map( direct_channel =>
          <DMContainer names={direct_channel.names}
                       users={this.props.users}
                       current_channel={this.props.current_channel}
                       switchChannel={this.props.switchChannel}
                       key={direct_channel.names} />
        )}
      </ul>
    </div>
  }
});

const ChannelsHeader = React.createClass({
  render() {
    let extraClass = this.props.name == "starred" ? " no-hover" : "";
    return <div>
      <div className={"channels-header" + extraClass}>
        <span className="channels-header-name overflow-ellipses"> 
          { this.props.name == "starred" 
              ? <span className="cs-filled-star">
                  <FilledStar size="18px"
                              color="#ab9ba9" />
                </span> 
              : null } 
          {this.props.name}
        </span>
        
        { this.props.count ? <ChannelsCount count={this.props.count} />
                           : null }
      </div>
      { this.props.name != "starred"
          ? <div className="plus-circle">+</div>
          : null }
    </div> 
  }
});

const ChannelsCount = React.createClass({
  render() {
    return <div className="channels-count">
      ({this.props.count})
    </div>
  }
});

const DMContainer = React.createClass({
  getInitialState() {
    return {hidden: true};
  },

  toggleXCircle(e) {
    this.setState({hidden: !this.state.hidden});
  },
  
  render() {
    let name_count = this.props.names.length;
    let present = this.props.users[this.props.names[0]].present; 
    let icon = name_count > 1 ? <NameCountSquare name_count={name_count} />
                              : <PresenceIndicator present={present} />
    let channel_name = this.props.names.join(", ");
    
    let extraClass = this.props.current_channel == channel_name
                     ? " current-channel"
                     : "";
    return <li className={"channel-container overflow-ellipses" + extraClass}
               onMouseOver={this.toggleXCircle}
               onMouseOut={this.toggleXCircle}
               onClick={this.props.switchChannel.bind(null,  this.props.username)}>
      {icon}
      <CSUsername present={this.props.present}     
                  username={channel_name} />
      <XCircle hidden={this.state.hidden} />
    </li>
  }  
});

const XCircle = React.createClass({
  render() {
    let hidden = this.props.hidden ? "hidden" : "";
    
    return <div className={"x-circle " + hidden}>
      x
    </div>
  }
});

const ChannelContainer = React.createClass({
  render() {
    let extraClass = this.props.current_channel == this.props.name 
                     ? " current-channel"
                     : "";
    return <li className={"channel-container overflow-ellipses" + extraClass}
               onClick={this.props.switchChannel.bind(null, this.props.name)} >
      <ChannelTypeIndicator private={this.props.private} 
                            size="10.5px"
                            extraClass="CS" />
      <span className="channel-name overflow-ellipses">{this.props.name}</span>
    </li>
  }
});

const ChannelTypeIndicator = React.createClass({
  render() {
    let lock = <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 82.5 82.5" version="1.1"
                   width={this.props.size} 
                   height={this.props.size}>
     <path d="m16.092 78.992c-2.09-0.419-5.507-4.107-5.975-6.45-0.2229-1.113-0.4051-8.452-0.4051-16.309 0-11.639 0.18528-14.747 1.0006-16.785 1.0742-2.6846 3.5897-4.6049 6.9682-5.3194l2.0312-0.42958 0.0074-6.6691c0.01146-10.303 1.662-14.953 7.0787-19.946 7.7945-7.1848 23.033-7.1848 30.828 0 5.4168 4.993 7.0673 9.6438 7.0787 19.946l0.0074 6.6691 2.0312 0.42958c3.5062 0.7415 5.9337 2.6463 7.0296 5.516 0.86652 2.269 0.99058 5.0194 0.82343 18.256-0.29094 23.041 2.4526 21.183-31.447 21.294-14.094 0.04625-26.27-0.04519-27.057-0.20313zm39.241-50.974c-0.0041-6.8233-0.69504-9.7175-2.9634-12.413-4.8097-5.716-15.506-5.716-20.316 0-2.2684 2.6958-2.9593 5.59-2.9634 12.413l-0.0035 5.7812h13.125 13.125l-0.0035-5.7812z"/>
    </svg>;
    
    if (this.props.private) {
      return <div className={"lock " + this.props.extraClass}>
               {lock}
             </div>
    }
    else {
      return <span className={"hash-indicator " + this.props.extraClass}>#</span>;
    }
  }
});

const CSUsername = React.createClass({
  render() {
    let headerClass = this.props.header ? " cs-username-header" : "";
    let italicClass = this.props.present === false ? "italic-true" : "";
    
    return <span className={"cs-username overflow-ellipses" + headerClass + italicClass}>
      {this.props.username}
    </span>
  }
});

const NameCountSquare = React.createClass({
  render() {
    return <span className="name-count-square">
              <span className="name-count-number">
                {this.props.name_count}
              </span>
           </span>
  }
});

const PresenceIndicator = React.createClass({
  render() {
    let extraClass = "";
    
    if (this.props.header) {
      extraClass = " cs-header-presence";
    }
    
    return <div className={"presence presence-" + this.props.present + extraClass}>
    </div>
  }
});



ReactDOM.render(<App />, document.getElementById('main'));
