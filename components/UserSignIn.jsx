import React from 'react';

const UserSignIn = React.createClass({
  render() {
    return <div className="sign-up-form-card">
      <h1 className="margin-bottom">
        Sign in to reslack.net/{this.props.params.groupPrefix}
      </h1>
      <div className="sign-up-form">
        <p className="margin-bottom">
          Enter your <strong>email address</strong> and <strong>password</strong>
          .
        </p>
        <p>
          <input type="email" placeholder="you@domain.com" size="40"></input>
        </p>
        <p className="small-margin-bottom">
          <input type="password" placeholder="password" size="40"></input>
        </p>
        <div className="btn">Sign in</div>
      </div>
    </div>
  }
});

export default UserSignIn;
