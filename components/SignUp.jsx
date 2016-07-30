import React from 'react';

const SignUp = React.createClass({
  render() {
    return <div className="page">
      <div className="page-contents">
        {this.props.children}
      </div>
    </div>
  }
});

export default SignUp;
