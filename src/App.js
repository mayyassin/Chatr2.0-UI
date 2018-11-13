import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import * as actionCreators from "./store/actions";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channels from "./components/Channels";
import ChannelForm from "./components/ChannelForm";

class App extends Component {
  componentDidMount() {
    this.props.fetchChannels();
  }
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/channels/:channelID" component={Channels} />

          <Route path="/channels" component={Channels} />
          <Route path="/createChannel" component={ChannelForm} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <div className="content-wrapper">
            {this.props.user ? (
              <PrivateRoute path="/private" component={SuperSecretPage} />
            ) : (
              <div>
                {" "}
                <Redirect to="/welcome" />{" "}
              </div>
            )}
          </div>
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
