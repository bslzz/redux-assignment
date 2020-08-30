import React from 'react';
import Firebase from 'firebase';

class PostSummary extends React.Component {
  removeItem = (postId) => {
    Firebase.firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1 postCard hoverable">
              <div class="card-content white-text">
                <span class="card-title">{this.props.post.title}</span>
                <p>{this.props.post.content}</p>
              </div>
              <div class="card-action">
                <span
                  onClick={() => this.removeItem(this.props.postId)}
                  className="material-icons btn-floating waves-effect waves-light red delete"
                >
                  delete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostSummary;
