import React from 'react';
import { NavLink } from 'react-router-dom';
import Firebase from 'firebase';

class RegisteredUsers extends React.Component {
  logOut = () => {
    Firebase.auth()
      .signOut()
      .then((resp) => {
        console.log('User has been logged out');
      })
      .catch((err) => {
        console.log('Some error has occurred while logging out');
      });
  };

  render() {
    return (
      <>
        <li>
          <NavLink activeClassName="activeNav" to="/create">
            Create New Post
          </NavLink>
        </li>
        <li>
          <NavLink onClick={this.logOut} to="/logout">
            Logout
          </NavLink>
        </li>
      </>
    );
  }
}

export default RegisteredUsers;
