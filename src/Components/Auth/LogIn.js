import React from 'react';
import { logIn } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };

    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    console.log(this);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmission = (e) => {
    e.preventDefault();
    const M = window.M;

    !this.state.email || !this.state.password
      ? M.toast({
          html: 'Enter all fields',
          classes: 'deep-orange lighten-1',
        })
      : this.props.logIn(this.state);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            {this.props.loginStatus ? (
              <>
                <div className="center-align teal darken-3 white-text">
                  You are now logged in
                </div>
                {/* {this.props.history.push('/')} */}
              </>
            ) : (
              <form
                onSubmit={this.handleSubmission}
                className="card z-depth-5 hoverable"
              >
                <div className="card-action teal lighten-1 white-text center-align">
                  <h3>Login</h3>
                </div>
                <div className="card-content">
                  <div className="input-field">
                    <i className="material-icons prefix">mail</i>
                    <input
                      id="email"
                      type="email"
                      className="validate"
                      onChange={this.handleChange}
                      name="email"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <i className="material-icons prefix">vpn_key</i>
                    <input
                      id="password"
                      type="password"
                      className="validate"
                      onChange={this.handleChange}
                      name="password"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field">
                    <button
                      className="btn-large waves-effect waves-dark"
                      style={{ width: '100%' }}
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: !state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (credentials) => {
      dispatch(logIn(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
