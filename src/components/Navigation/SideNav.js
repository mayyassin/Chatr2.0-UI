import React from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
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

  componentDidMount() {
    if (this.props.user) this.props.fetchChannels();
  }

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.id} channel={channel} />
    ));

    return (
      <div>
        {this.props.user && (
          <ul
            style={{ overflowY: "scroll" }}
            className="navbar-nav navbar-sidenav"
            id="exampleAccordion"
          >
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2">Channels</span>
                <FontAwesomeIcon icon={faPlusCircle} />
              </Link>
              <Link className="nav-link heading" to="/channels/all/">
                <span className="nav-link-text mr-2">ChannelList</span>
                {channelLinks}
              </Link>
            </li>
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
  channels: state.channels.channelList,
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
