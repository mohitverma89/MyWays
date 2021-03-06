import React, { Component } from "react";
import './LoginForm.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
        
        <div className="wrer">
        
        <div className="form-wrer" >
        <div className="loginclose">
        <h1 className="logint">Login</h1>
        <span class="clozee" title="Close Modal"><a href="/" className="arroww">&times;</a></span>
        </div>
        <div className="inside-wrer">
        
        <h2 className="student">Student</h2>
        <p className="studentline"></p>
          <form onSubmit={this.handleSubmit} noValidate method="post">
            
            <div className="temail">
              <label htmlFor="email"></label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                id="commonid"
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="tpassword">
              <label htmlFor="password"></label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                id="commonid"
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <p className="ForgotPassword">Forgot Password?</p>
            <div className="loginf">
              <button type="submit">Sign Up</button>
            <p className="lastt"><strong>New to MyWays? Sign Up here</strong></p>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginForm;