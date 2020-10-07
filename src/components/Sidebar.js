import React, { Component } from 'react';
import { signOut,auth } from '../firebase';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    const { channels } = this.props;
    return (
      <div id="sidebar">
        <div className="user-profile">
          <div className="avatar">
            <img src={auth.currentUser.photoURL} />
          </div>
    <div>{auth.currentUser.displayName}</div>
          <div
            style={{ marginLeft: 10, marginTop: 2, cursor: 'pointer' }}
            onClick={signOut}
          >
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2150/2150480.svg"
              height="25"
            />
          </div>
        </div>
        <hr className="sidebar-spacer" />

        <div className="channels">
          <div className="header">Channels</div>

          <ul className="channels-list">
            {channels.map((channel) => (
              <li key={channel.id}>
                <Link to={`/?id=${channel.id}`}># {channel.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
