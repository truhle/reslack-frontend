import React from 'react';
import { Link } from 'react-router';
import auth from '../modules/auth.js';

const TeamMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  handleSignOut(e) {
    e.preventDefault();
    auth.logout(() => {
      let path = `/${this.props.groupPrefix}/signin`;
      this.context.router.push(path);
    });
  },
  
  render() {
    return <div className={this.props.open ? "" : "hidden" }>
      <div className="popover-mask" onClick={this.props.toggleTeamMenu}>
      </div>
      <div className="menu">
        <h2 className="menu-header">
          <div className="user-icon" style={{background: this.props.current_user.icon}}></div>
          <div className="menu-header-primary overflow-ellipses">
            {this.props.current_user.username}
          </div>
          <div className="menu-header-secondary overflow-ellipses">
            @{this.props.current_user.username} 
          </div>
          
        </h2>
        <ul className="menu-list">
          {/* <li>
            <Link to="">
              Profile & account
            </Link>
          </li>
          <li>
            <Link to="">
              Preferences
            </Link>
          </li>
          <li>
            <Link to="">
              Set yourself to <strong>away</strong>
            </Link>
          </li>
          <li>
            <Link to="">
              Help & feedback
            </Link>
          </li> */}
          <li>
            <a onClick={this.handleSignOut}>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  }
});

export default TeamMenu;
