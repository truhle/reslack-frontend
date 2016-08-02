import React from 'react';
import $ from 'jquery';

const UserSignIn = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  componentWillMount() {
    this.props.ensureGroupId(this.props.params.groupPrefix);
  },
  
  handleSubmit(e) {
    e.preventDefault();
    let email = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    console.log(email, password);
  },
  
  render() {
    return <div className="sign-up-form-card">
      <h1 className="margin-bottom">
        Sign in to reslack.net/{this.props.params.groupPrefix}
      </h1>
      <form className="sign-up-form" onSubmit={this.handleSubmit}>
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
        <button type="submit" className="btn">Sign in</button>
      </form>
    </div>
  }
});

export default UserSignIn;
