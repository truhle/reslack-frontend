import React from 'react';
import EmptyStar from './EmptyStar';
import FilledStar from './FilledStar';

const StarToggle = React.createClass({
  render() {
    let visibilityClass = this.props.starred ? " visible" : "";
    if (this.props.starred == false) {
      var star = <EmptyStar size="13px" />;
    } else {
      var star = <span className="filled-star">
                   <FilledStar size="16px"
                               color="#fc0" />
                 </span>
    }
    
    return <div className={"star-toggle" + visibilityClass} 
                onClick={this.props.toggleStarred}>
      {star}
    </div>
  }
});

export default StarToggle;
