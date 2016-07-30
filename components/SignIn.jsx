import React from 'react';
import GroupSignIn from './GroupSignIn';
import UserSignIn from './UserSignIn';

const SignIn = React.createClass({
  render() {
    let params = this.props.params;
    let child = params.groupPrefix 
                ? <UserSignIn params={params} />
                : <GroupSignIn params={params} />; 
    return <div className="page">
      <div className="page-contents">
        {child}
      </div>
    </div>
  }
});

export default SignIn;
