import React from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    let channelLinks = [];
    if (this.props.user) {
      const channelLinks = [{ name: "all" }].map(channel => (
        <ChannelNavLink key={channel.name} channel={channel} />
      ));
    }
    return (
      <div>
        {this.props.user && (
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2">Channels</span>
                <FontAwesomeIcon icon={faPlusCircle} />
              </Link>
            </li>
            {channelLinks}
          </ul>
        )}
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
