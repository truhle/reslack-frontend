import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/_normalize.scss';
import './styles/style.scss';

const App = () => ( 
  <div>
    <ChannelSwitcher />
  </div> );

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
    return <div className="cs-header overflow-ellipses">
      MetaTree
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
      <DMUsername present={this.props.present}     
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

const DMUsername = React.createClass({
  render() {
    return <span className={"dm-username overflow-ellipses no-italic-" + this.props.present}>
      {this.props.username}
    </span>
  }
});

const PresenceIndicator = React.createClass({
  render() {
    return <div className={"presence presence-" + this.props.present}>
    </div>
  }
});



ReactDOM.render(<App />, document.getElementById('main'));
