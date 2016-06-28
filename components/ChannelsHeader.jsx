import React from 'react';
import FilledStar from './FilledStar';

const ChannelsHeader = React.createClass({
  render() {
    let extraClass = this.props.name == "starred" ? " no-hover" : "";
    return <div>
      <div className={"channels-header" + extraClass}>
        <span className="channels-header-name"> 
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

export default ChannelsHeader;
