import React from 'react';
import { logOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {
  componentDidMount = () => {
    this.props.logOut();
  };

  render() {
    return (
      <>
        {this.props.loginStatus ? (
          <div className="center-align red accent-2">Logout fail</div>
        ) : (
          <>
            <div className="center-align red accent-2">Logout success</div>
            <Redirect to="/login" />
          </>
        )}
      </>
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
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
