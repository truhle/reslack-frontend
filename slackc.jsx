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
      <ChannelsHeader name="channels" />
    </div>
  }
});

const DMChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="direct messages" />
      <div className="clear"></div>
      <ul>
        <DMContainer present="true" username="Taliesin" />
        <DMContainer present="false" username="Bob" />
      </ul>
    </div>
  }
});

const ChannelsHeader = React.createClass({
  render() {
    return <div>
      <div className="channels-header">
        <span className="channels-header-name overflow-ellipses">{this.props.name}</span>
        <ChannelsCount />
      </div>
      <div className="plus-circle">+</div>
    </div> 
  }
});

const ChannelsCount = React.createClass({
  render() {
    return <div className="channels-count">
      (2)
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
    return <li className="dm-container"
               onMouseOver={this.addXCircle}
               onMouseOut={this.removeXCircle}>
      <PresenceIndicator present={this.props.present} />
      <DMUsername present={this.props.present}     
                  username={this.props.username} />
      <div className={"x-circle " + this.state.hidden}>x</div>
    </li>
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
