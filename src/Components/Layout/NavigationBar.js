import React from 'react';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import NonRegisteredUsers from './NonRegisteredUsers';
import RegisteredUsers from './RegisteredUsers';

class NavigationBar extends React.Component {
  render() {
    const M = window.M;
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems, {});
    });
    return (
      <>
        <nav>
          <div className="container">
            <div className="nav-wrapper flow-text">
              <NavLink
                to="/"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </NavLink>
              <Logo />
              {this.props.uid ? (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <RegisteredUsers></RegisteredUsers>
                </ul>
              ) : (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <NonRegisteredUsers></NonRegisteredUsers>
                </ul>
              )}
            </div>
          </div>
        </nav>

        {this.props.uid ? (
          <ul className="sidenav toggleBar" id="mobile-demo">
            <RegisteredUsers></RegisteredUsers>
          </ul>
        ) : (
          <ul className="sidenav toggleBar" id="mobile-demo">
            <NonRegisteredUsers></NonRegisteredUsers>
          </ul>
        )}
      </>
    );
  }
}

export default NavigationBar;
