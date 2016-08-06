import React from 'react';
import Alert from './Alert';
import GroupSignIn from './GroupSignIn';
import UserSignIn from './UserSignIn';

const SignIn = React.createClass({
  getInitialState() {
    return {
      alertMessage: ""
    }
  },
  
  updateAlert(message) {
    this.setState({alertMessage: message})
  },
  
  render() {
    let alert = this.state.alertMessage 
              ? <Alert alertMessage={this.state.alertMessage} />
              : "";
    
    let params = this.props.params;
    let signInForm = params.groupPrefix 
                ? <UserSignIn {...this.props} updateAlert={this.updateAlert} />
                : <GroupSignIn {...this.props} updateAlert={this.updateAlert}/>; 
    return <div className="page">
      <div className="page-contents">
        {alert}
        {signInForm}
      </div>
    </div>
  }
});

export default SignIn;
