import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './Components/Layout/NavigationBar';
import Feeds from './Components/HomePage/Feeds';
import LogIn from './Components/Auth/LogIn';
import LogOut from './Components/Auth/LogOut';
import Register from './Components/Auth/Register';
import PostDetails from './Components/Posts/PostDetails';
import CreateNewPost from './Components/Posts/CreateNewPost';
import Firebase from 'firebase';
import { FIREBASE_CONFIG as firebaseConfig } from './config/firebaseConfig';

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);
Firebase.analytics();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
    };
  }

  componentDidMount = () => {
    this.setState({
      uid: Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null,
    });

    Firebase.auth().onAuthStateChanged((user) => {
      // only executes when there has been changes to the user login status

      // user is now logged in, previously not
      if (user && this.state.uid === null) {
        this.setState({
          uid: user.uid,
        });

        // user is now not logged in, and previously was
      } else if (!user && this.state.uid !== null) {
        this.setState({
          uid: null,
        });
      }
    });
  };

  render() {
    return (
      <Router>
        <NavigationBar uid={this.state.uid} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Feeds uid={this.state.uid} />;
            }}
          ></Route>

          <Route
            exact
            path="/create"
            render={() => {
              return <CreateNewPost uid={this.state.uid} />;
            }}
          ></Route>

          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={LogIn}></Route>

          <Route
            exact
            path="/logout"
            render={() => {
              return <LogOut uid={this.state.uid} />;
            }}
          ></Route>
          <Route exact path="/post/:id" component={PostDetails}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
