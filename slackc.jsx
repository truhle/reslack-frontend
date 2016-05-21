import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';

const App = () => ( 
  <div>
    <ChannelSwitcher />
    <ChannelView />
  </div> );
  
const ChannelView = React.createClass({
  render() {
    return <div>
      <ChannelHeader />
    </div>
  }
});

const ChannelHeader = React.createClass({
  getInitialState() {
    return {
      starred: false
    }
  },
  toggleStar() {
    this.setState({starred: !this.state.starred})
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
      var star = <img src="svg/filled_star.svg" />
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



const ChannelSwitcher = React.createClass({
  render() {
    return <div className="channel-switcher">
      <CSHeader />
      <ChannelsContainer />
      <DMChannelsContainer />
    </div>
  }
});

const CSHeader = React.createClass({
  render() {
    return <div className="cs-header">
        <CSHeaderName group_name="MetaTree" />
        <NotificationsIcon />
        <UserIndicator present={true} username="taliesin" /> 
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

const ChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="channels" count="3" />
      <div className="clear"></div>
      <ul>
        <ChannelContainer private={false} name="general" />
        <ChannelContainer private={false} name="random" />
        <ChannelContainer private={true} name="webschool" />
      </ul>
    </div>
  }
});

const DMChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="direct messages" count="2" />
      <div className="clear"></div>
      <ul>
        <DMContainer present={true} username="taliesin" />
        <DMContainer present={false} username="bob" />
      </ul>
    </div>
  }
});

const ChannelsHeader = React.createClass({
  render() {
    return <div>
      <div className="channels-header">
        <span className="channels-header-name overflow-ellipses">{this.props.name}</span>
        <ChannelsCount count={this.props.count} />
      </div>
      <div className="plus-circle">+</div>
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
    return <li className="channel-container"
               onMouseOver={this.toggleXCircle}
               onMouseOut={this.toggleXCircle}>
      <PresenceIndicator present={this.props.present} />
      <CSUsername present={this.props.present}     
                  username={this.props.username} />
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
    return <li className="channel-container">
      <ChannelTypeIndicator private={this.props.private} 
                            size="10.5px"
                            extraClass="CS" />
      <span className="channel-name overflow-ellipses">{this.props.name}</span>
    </li>
  }
});

const ChannelTypeIndicator = React.createClass({
  render() {
    let svg = <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 82.5 82.5" version="1.1"
                   width={this.props.size} 
                   height={this.props.size}>
     <path d="m16.092 78.992c-2.09-0.419-5.507-4.107-5.975-6.45-0.2229-1.113-0.4051-8.452-0.4051-16.309 0-11.639 0.18528-14.747 1.0006-16.785 1.0742-2.6846 3.5897-4.6049 6.9682-5.3194l2.0312-0.42958 0.0074-6.6691c0.01146-10.303 1.662-14.953 7.0787-19.946 7.7945-7.1848 23.033-7.1848 30.828 0 5.4168 4.993 7.0673 9.6438 7.0787 19.946l0.0074 6.6691 2.0312 0.42958c3.5062 0.7415 5.9337 2.6463 7.0296 5.516 0.86652 2.269 0.99058 5.0194 0.82343 18.256-0.29094 23.041 2.4526 21.183-31.447 21.294-14.094 0.04625-26.27-0.04519-27.057-0.20313zm39.241-50.974c-0.0041-6.8233-0.69504-9.7175-2.9634-12.413-4.8097-5.716-15.506-5.716-20.316 0-2.2684 2.6958-2.9593 5.59-2.9634 12.413l-0.0035 5.7812h13.125 13.125l-0.0035-5.7812z"/>
    </svg>;
    
    if (this.props.private) {
      return <div className={"lock " + this.props.extraClass}>
               {svg}
             </div>
    }
    else {
      return <span className={"hash-indicator " + this.props.extraClass}>#</span>;
    }
  }
});

const CSUsername = React.createClass({
  render() {
    let extraClass = "";
    
    if (this.props.header) {
      extraClass = " cs-username-header";
    }
    
    return <span className={"cs-username overflow-ellipses no-italic-" + this.props.present + extraClass}>
      {this.props.username}
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
