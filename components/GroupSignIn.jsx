import React from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router";
import DocumentTitle from "react-document-title";
import $ from 'jquery';

const GroupSignIn = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.prefixInput).focus();
    this.props.updateAlert('');
  },
  
  handleSubmit(e) {
    e.preventDefault();
    let groupPrefix = e.target.elements[0].value;
    let url = "http://localhost:3000/group_prefixes/" + groupPrefix;
    $.getJSON(url, function(response) {
      if (response.exists) {
        this.props.updateGroupPrefix(groupPrefix);
        this.props.updateAlert("");
        let path = `/${groupPrefix}/signin`;
        this.context.router.push(path);
      } 
      else {
        let alert = (
          <span>
            <strong>We couldn't find your team.</strong>
          </span>
        );
        this.props.updateAlert(alert);
      }
    }.bind(this))
  },
  
  render() {
    return <DocumentTitle title="SignIn | Reslack" className="sign-up-form-card">
      <div className="sign-up-form-card">
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
    </DocumentTitle>
  }
});

export default GroupSignIn;
