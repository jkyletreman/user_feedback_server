import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Payments from "./Payments"

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
        return [
          <li key={1}><Payments /></li>,
          <li key={2}><a href="/api/logout">Log Out</a></li>
        ];
    }
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={this.props.auth ? "/surveys" : "/"} className="left brand-logo">Emaily</Link>
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
