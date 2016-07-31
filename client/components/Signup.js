import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { signupUser } from '../actions/auth.js';

class Signup extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  generateOptions() {
    const options = ['Learner', 'Mentor'];
    return options.map((option, i) => {
      return <option key={ i }> { option } </option>
    })
  }

  render() {

    const { handleSubmit, fields: { firstName, lastName, phoneNum, zipCode, email, password }} = this.props;

    return (
        <div className="spacer50">
    			<div className="container">
    			  <div className="row">
    			  	<div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <h2 className="header-tag">signup</h2>
                <h1 className="sub-header">Your ideal <em>mentor</em> is waiting for you.</h1>
                <div className="spacer30"></div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" {...firstName} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" {...lastName} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Phone Number" {...phoneNum} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Zip Code" {...zipCode} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" {...email} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Password" {...password} />
                  </div>
                  <button className="btn-global" type="submit"> Sign Up </button>
                </form>
                <div className="redirect">
                  Already have an account? <Link to={"/login"}>LOG IN</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default reduxForm({
  form: 'login',
  fields: ['firstName', 'lastName', 'phoneNum', 'zipCode', 'email', 'password']
}, null, { signupUser })(Signup);