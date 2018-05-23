import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Still deciding";
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return <li><a>Log Out</a></li>
    }
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a className="left brand-logo">Emaily</a>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  // returns a object with data from the store
  return { auth };
};

export default connect(mapStateToProps)(Header);
