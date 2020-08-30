import Firebase from 'firebase';

export const removePosts = () => {
  return (dispatch) =>
    // [START delete_document]
    Firebase.firestore()
      .collection('posts')
      .doc('posts')
      .delete()
      .then(function () {
        dispatch({ type: 'REMOVE_ALL_POSTS' });
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
};

// export const createPost = post => ({ type: 'CREATE_NEW_POST', post })

export const createPost = function (post) {
  return (dispatch, getState, storeEnhancers) => {
    storeEnhancers
      .getFirestore()
      .collection('posts')
      .add(post)
      .then(() => {
        dispatch({ type: 'CREATE_NEW_POST' });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_NEW_POST_FAILED', err: err });
      });
  };
};

export const getPosts = () => {
  return (dispatch, getState, storeEnhancers) => {
    storeEnhancers
      .getFirestore()
      .collection('posts')
      .get()
      .then((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          let post = {
            id: doc.id,
            data: doc.data(),
          };
          posts.push(post);
        });
        console.log(posts);
        dispatch({
          type: 'FETCHED_POSTS_SUCCESS',
          resp: posts,
        });
      })

      .catch((err) => {
        dispatch({
          type: 'FETCHED_POSTS_FAIL',
          err: err,
        });
      });
  };
};
