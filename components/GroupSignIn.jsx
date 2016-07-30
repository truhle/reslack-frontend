import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

const GroupSignIn = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.prefixInput).focus();
  },
  
  handleSubmit(e) {
    e.preventDefault();
    let groupPrefix = e.target.elements[0].value;
    let path = `/${groupPrefix}/signin`;
    this.context.router.push(path);
  },
  
  render() {
    return <div className="sign-up-form-card">
      <h1 className="margin-bottom">
        Sign in to your team
      </h1>
      <form className="sign-up-form" onSubmit={this.handleSubmit}>
        <p className="margin-bottom">
          Enter your team's <strong>Reslack prefix</strong>
          .
        </p>
        <p>
          reslack.net/
          <input type="text" ref="prefixInput" placeholder="teamprefix" size="40"></input>
        </p>
        <button type="submit" className="btn continue-btn">Continue &rarr;</button> 
      </form>
    </div>
  }
});

export default GroupSignIn;
