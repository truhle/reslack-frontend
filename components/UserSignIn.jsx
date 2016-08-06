import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import auth from '../modules/auth.js';

const UserSignIn = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.emailInput).focus();
  },
  
  // componentWillMount() {
  //   this.props.ensureGroupId(this.props.params.groupPrefix);
  // },
  
  handleSubmit(e) {
    e.preventDefault();
    let email = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    auth.login(email, password, (result, response) => {
      if (result) {
        console.log("Response:", response);
        console.log("Response.user:", response.user);
        console.log("Response.session:", response.session);
        this.props.setUser(response.user);
        this.props.updateAlert(alert);
        let path = `/${this.props.params.groupPrefix}/`;
        this.context.router.push(path);
      }
      else {
        let alert = "Sorry, you entered an incorrect email or password."
        this.props.updateAlert(alert);
      }
    });
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
          <input type="email" ref="emailInput" placeholder="you@domain.com" size="40" defaultValue="sean@example.com"></input>
        </p>
        <p className="small-margin-bottom">
          <input type="password" placeholder="password" size="40" defaultValue="secret"></input>
        </p>
        <button type="submit" className="btn">Sign in</button>
      </form>
    </div>
  }
});

export default UserSignIn;
