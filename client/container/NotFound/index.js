import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Oops, page not found</title>
        </Helmet>
        <h2>Page Not Found :(</h2>
      </div>
    );
  }
}