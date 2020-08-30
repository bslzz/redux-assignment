import React from 'react';
import AllPosts from '../Posts/AllPosts';
import { Redirect } from 'react-router-dom';

const Feeds = (props) => (
  <div>{props.uid ? <AllPosts /> : <Redirect to="/login" />}</div>
);

export default Feeds;
