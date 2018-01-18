import './header.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import {
  Navbar, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, Collapse,
  UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {
  FaHome, FaUser, FaFlag,
  FaSignIn, FaSignOut
} from 'react-icons/lib/fa';
import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { locales } from '../../../config/translation';
import appConfig from '../../../config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export class Header extends React.Component<IHeaderProps, { menuOpen: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  }

  renderDevRibbon = () => (
    process.env.NODE_ENV === 'development' ?
      <div className="ribbon dev"><a href=""><Translate contentKey="global.ribbon.dev" /></a></div> :
      null
  )

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { currentLocale, isAuthenticated } = this.props;
    const accountMenuItems = [];
    if (isAuthenticated) {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="logout" to="/logout"><FaSignOut /> Logout</DropdownItem>
      );
    } else {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="login" to="/login"><FaSignIn /> Login</DropdownItem>,
        <DropdownItem tag={Link} key="register" to="/register"><FaSignIn /> Register</DropdownItem>
      );
    }

    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar"/>
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <NavbarBrand tag={Link} to="/" className="brand-logo">
            <span className="brand-title"><Translate contentKey="global.title">JhipsterSampleApplicationReact</Translate></span>
            <span className="navbar-version">{appConfig.VERSION}</span>
          </NavbarBrand>
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" className="d-flex align-items-center">
                  <FaHome />
                  <span>Home</span>
                </NavLink>
              </NavItem>
              { locales.length > 1 ?
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret className="d-flex align-items-center">
                    <FaFlag />
                    <span>{currentLocale.toUpperCase()}</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    {locales.map(lang => <DropdownItem key={lang} value={lang} onClick={this.handleLocaleChange}>{lang.toUpperCase()}</DropdownItem>)}
                  </DropdownMenu>
                </UncontrolledNavDropdown> : null
              }
              <UncontrolledNavDropdown>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FaUser />
                  <span>Account</span>
                </DropdownToggle>
                <DropdownMenu right>
                  {accountMenuItems}
                </DropdownMenu>
              </UncontrolledNavDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
