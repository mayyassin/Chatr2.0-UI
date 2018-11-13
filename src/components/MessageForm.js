import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.onTextchange = this.onTextchange.bind(this);
  }

  submitMessage(e) {
    e.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
  }

  onTextchange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submitMessage} className="form-group">
        <input
          className="form-control"
          type="text"
          name="message"
          placeholder="Enter message here..."
          onChange={this.onTextchange}
          value={this.state.message}
        />
        <input type="submit" value="Add Message" className="btn btn-success" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (newMessage, channelID) =>
      dispatch(actionCreators.postMessage(newMessage, channelID))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MessageForm);
