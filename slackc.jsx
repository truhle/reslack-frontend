import React from 'react';
import ReactDOM from 'react-dom';
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
    </div>
  }
});

const CSHeader = React.createClass({
  render() {
    return <div className="cs-header">
      MetaTree
    </div>
  }
});

const ChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="channels" />
      <ChannelsHeader name="direct messages" />
    </div>
  }
});

const ChannelsHeader = React.createClass({
  render() {
    return <div className="channels-header">
      <span className="channels-header-name">{this.props.name}</span>
      <ChannelsCount />
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



ReactDOM.render(<App />, document.getElementById('main'));
