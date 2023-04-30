import { Router } from '@reach/router';
import { Layout } from 'gatsby-plugin-image';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

const SomeSubPage = (props: any) => {
  return <div>Hi from SubPage with id: {props.id}</div>;
};

const App = () => (
  <div>
    <Link to="/app/1">First item</Link>
    <Link to="/app/2">Second item</Link>{' '}
    <Router>
      // ...dynamic routes here
      <SomeSubPage path="/app/:id" />
    </Router>
  </div>
);

export default App;
