import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/_normalize.scss';
import './styles/style.scss';

const App = () => ( 
  <div>
    <ChannelSwitcher />
    <ChannelView />
  </div> );
  
const ChannelView = React.createClass({
  render() {
    let svg = <svg xmlns="http://www.w3.org/2000/svg" height="75" viewBox="0 0 75 75" width="75" version="1.1">
     <path d="m30.172 70.346c-16.872-3.842-28.484-20.732-25.912-37.69 2.7618-18.205 20.089-31.125 38.084-28.396 6.8163 1.0338 13.963 4.6463 18.84 9.5228 11.006 11.006 13.446 30.639 4.5521 36.63-4.3328 2.9184-10.752 2.4307-14.801-1.1245l-2.174-1.9088-1.9219 1.6172c-2.633 2.217-8.053 3.724-11.393 3.169-7.685-1.277-12.544-6.956-12.548-14.665-0.003-6.0173 2.7214-10.521 8.0398-13.292 3.5623-1.8556 9.7133-1.8355 13.281 0.04336 1.4609 0.76932 2.6562 1.1319 2.6562 0.80569 0-0.88353 1.8408-2.5573 2.8125-2.5573 0.46652 0 1.2902 0.44196 1.8304 0.98214 0.799 0.799 0.982 2.61 0.982 9.719 0 9.5778 0.53892 11.615 3.42 12.928 5.496 2.503 9.705-1.309 9.705-8.79 0-12.286-9-23.891-20.94-27.001-24.193-6.3012-44.212 20.261-31.269 41.488 7.3823 12.108 21.794 16.88 35.01 11.593 4.7448-1.8982 6.1207-1.6547 6.4561 1.1429 0.16277 1.3575-0.23458 1.8424-2.4259 2.9603-6.3499 3.2395-15.414 4.3881-22.284 2.8237zm12.796-25.234c2.6299-1.8726 4.1205-5.2843 3.7489-8.5806-0.59224-5.2543-5.0099-8.8315-10.186-8.2481-12.043 1.3574-10.407 19.38 1.6703 18.4 1.623-0.13161 3.7118-0.8202 4.7667-1.5714z"/>
    </svg>;
    
    return <div className="svg">
      {svg}  
    </div>
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
        <UserIndicator present="true" username="taliesin" /> 
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
      <PresenceIndicator present={this.props.present} header="true" />
      <CSUsername present={this.props.present} 
                  username={this.props.username}
                  header="true" />
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
        <ChannelContainer private="false" name="general" />
        <ChannelContainer private="false" name="random" />
        <ChannelContainer private="true" name="webschool" />
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
        <DMContainer present="true" username="taliesin" />
        <DMContainer present="false" username="bob" />
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
    return {hidden: "hidden"};
  },

  addXCircle(e) {
    this.setState({hidden: ""});
  },
  
  removeXCircle(e) {
    this.setState({hidden: "hidden"});
  },
  
  render() {
    return <li className="channel-container"
               onMouseOver={this.addXCircle}
               onMouseOut={this.removeXCircle}>
      <PresenceIndicator present={this.props.present} />
      <CSUsername present={this.props.present}     
                  username={this.props.username} />
      <div className={"x-circle " + this.state.hidden}>x</div>
    </li>
  }  
});

const ChannelContainer = React.createClass({
  render() {
    return <li className="channel-container">
      <ChannelTypeIndicator private={this.props.private} />
      <span className="channel-name overflow-ellipses">{this.props.name}</span>
    </li>
  }
});

const ChannelTypeIndicator = React.createClass({
  render() {
    if (this.props.private == "true") {
      return <img src="svg/lock.svg" 
      height="11px" 
      width="11px" /> 
    }
    else {
      return <span className="hash-indicator">#</span>;
    }
  }
});

const CSUsername = React.createClass({
  render() {
    let extraClass = "";
    if (this.props.header == "true") {
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
    if (this.props.header == "true") {
      extraClass = " cs-header-presence";
    }
    return <div className={"presence presence-" + this.props.present + extraClass}>
    </div>
  }
});



ReactDOM.render(<App />, document.getElementById('main'));
