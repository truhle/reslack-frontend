import React from 'react';
import GroupSignIn from './GroupSignIn';
import UserSignIn from './UserSignIn';

const SignIn = React.createClass({
  render() {
    let params = this.props.params;
    let signInForm = params.groupPrefix 
                ? <UserSignIn {...this.props} />
                : <GroupSignIn {...this.props} />; 
    return <div className="page">
      <div className="page-contents">
        {signInForm}
      </div>
    </div>
  }
});

export default SignIn;
