import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/postActions';
import Firebase from 'firebase';

class CreateNewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmission = (e) => {
    const M = window.M;
    e.preventDefault();
    if (!this.state.postTitle || !this.state.postContent) {
      return M.toast({
        html: 'Enter all fields',
        classes: 'deep-orange lighten-1',
      });
    }

    this.props.createPost({
      title: this.state.postTitle,
      content: this.state.postContent,
      time: Date.now(),
      user: Firebase.auth().currentUser.uid,
    });
    M.toast({
      html: 'New Post Created',
      classes: 'green darken-2',
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <form
            onSubmit={this.handleSubmission}
            className="card z-depth-5 hoverable"
          >
            <div className="card-action teal lighten-1 white-text center-align">
              <h3>Create New Post</h3>
            </div>
            <div className="card-content">
              <div className="input-field">
                <i className="material-icons prefix">title</i>
                <label htmlFor="postTitle">Title</label>
                <input
                  id="postTitle"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <i className="material-icons prefix">insert_comment</i>
                <label htmlFor="postContent">Content</label>
                <input
                  id="postContent"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <button
                  className="btn-large waves-effect waves-dark"
                  style={{ width: '100%' }}
                >
                  Create New Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
// when to dispatch the action?
// what is the name of the props to be called so that the action is dispatched
// is there a payload to be dispatched together with the action?

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
  };
};

export default connect(null, mapDispatchToProps)(CreateNewPost);
