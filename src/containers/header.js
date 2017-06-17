import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { logoutAction } from '../actions/action_login.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class Header extends Component {

  showDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  removeDropDown() {
    document.getElementById("myDropdown").classList.remove("show");
  }

  onLogout() {
    this.props.logoutAction();
  }

  render () {
    return (
      <header>
        <div className="left-nav-items" >
          <div onClick={this.showDropDown} className="dropdown mobile-view">
            <div className="dropbtn">
              <div className="dropbtn-bar"></div>
              <div className="dropbtn-bar"></div>
              <div className="dropbtn-bar"></div>
            </div>
            <div id="myDropdown" className="dropdown-content">
              <Link to="/">Home</Link>
              {this.props.login.loggedIn && <Link to="/profile">Profile</Link> }
              <Link to="/about">About</Link>
              <Link to="/help">Help</Link>
              {this.props.login.loggedIn && <a onClick={() => this.onLogout()}>Log Out</a> }
            </div>
          </div>
        </div>
        <div className="logo" onClick={this.removeDropDown}>
          <Link to="/"><img className="logo-G" src="../pics/GTLogo4.png" alt="" /></Link>
        </div>
        <div className="right-nav" onClick={this.removeDropDown}>
          <nav className="desktop-view">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/help">Help</Link>
          </nav>
        </div>
      </header>
    )
  }
}

function mapStateToProps(store) {
  return {
    login: store.login,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutAction }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
