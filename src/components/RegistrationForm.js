import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";

class RegistationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentWillUnmount() {
    this.props.resetForm();
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.props.match.url.substring(1) === "login") {
      this.props.login(this.state, this.props.history);
    } else {
      this.props.signup(this.state, this.props.history);
    }
  }

  render() {
    const type = this.props.match.url.substring(1);
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={this.submitHandler} noValidate>
            {/* {authStore.errors.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {authStore.errors}
            </div>
          )} */}
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={this.changeHandler}
              />
            </div>
            {this.props.errors.username && (
              <div className="alert alert-danger">
                {this.props.errors.username}
              </div>
            )}
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={this.changeHandler}
              />
            </div>
            {this.props.errors.password && (
              <div className="alert alert-danger">
                {this.props.errors.password}
              </div>
            )}
            {this.props.errors.non_field_errors && (
              <div className="alert alert-danger">
                {this.props.errors.non_field_errors}
              </div>
            )}

            <div />
            <input
              className="btn btn-primary"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
            // onClick={() => (authStore.errors = [])}
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});
const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history)),
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history)),
    resetForm: () => dispatch(actionCreators.setErrors({}))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
