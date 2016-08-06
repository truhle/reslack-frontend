import React from 'react';
import Alert from './Alert';
import GroupSignIn from './GroupSignIn';
import UserSignIn from './UserSignIn';

const SignIn = React.createClass({
  
  render() {
    let alert = this.props.alertMessage 
              ? <Alert alertMessage={this.props.alertMessage} />
              : "";
    
    let params = this.props.params;
    let signInForm = params.groupPrefix 
                ? <UserSignIn {...this.props} />
                : <GroupSignIn {...this.props} />; 
    return <div className="page">
      <div className="page-contents">
        {alert}
        {signInForm}
      </div>
    </div>
  }
});

export default SignIn;
