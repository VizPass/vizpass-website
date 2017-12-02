import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import GitHubLogo from '../github-logo';

import './header.css';


const Header = ({authenticated, signOut}) => (
  <header className="header">
    <div className="g-row">
      <div className="g-col">
        <img src="./logo.png"></img>

        <ul className="header__actions">
          {authenticated ? <li><Button className="signOut-btn" onClick={signOut}>Sign out</Button></li> : null}
          <li>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};


export default Header;
