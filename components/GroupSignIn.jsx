import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

const GroupSignIn = React.createClass({
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.prefixInput).focus();
  },
  render() {
    return <div className="sign-up-form-card">
      <h1 className="margin-bottom">
        Sign in to your team
      </h1>
      <div className="sign-up-form">
        <p className="margin-bottom">
          Enter your team's <strong>Reslack prefix</strong>
          .
        </p>
        <p>
          reslack.net/
          <input type="text" ref="prefixInput" placeholder="teamprefix" size="40"></input>
        </p>
        <div className="btn continue-btn">Continue &rarr;</div>
      </div>
    </div>
  }
});

export default GroupSignIn;
