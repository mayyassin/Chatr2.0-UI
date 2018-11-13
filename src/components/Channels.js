import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import MessageForm from "./MessageForm";

class Channels extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.fetchMessages(this.props.match.params.channelID);
    }, 1000);
  }

  componentDidUpdate() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.fetchMessages(this.props.match.params.channelID);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const channelList = this.props.messages.map(message => (
      <div key={message.id}>
        <p>
          {message.username}: {message.message}
        </p>
      </div>
    ));

    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO CHATR</h1>
          {!this.props.user && (
            <div>
              <h3 className="mb-5">
                <em>You're gonna need to login to see the messages</em>
              </h3>
              <Link to="/login" className="btn btn-primary btn-lg">
                Login
              </Link>
            </div>
          )}
          {this.props.user && channelList}
          <MessageForm channelID={this.props.match.params.channelID} />
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fecthChannels: () => dispatch(actionCreators.fetchChannels()),
    fetchMessages: channelID =>
      dispatch(actionCreators.fetchMessages(channelID)),
    postMessage: (channelID, newMessage) =>
      dispatch(actionCreators.postMessage(channelID, newMessage))
  };
};
const mapStateToProps = state => ({
  channels: state.channels.channelList,
  messages: state.messages.messages,
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
