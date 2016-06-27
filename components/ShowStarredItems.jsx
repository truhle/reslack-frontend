import React from 'react';
import EmptyStar from './EmptyStar';

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

export default ShowStarredItems;
