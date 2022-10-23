import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";

export function Topics() {
    let match = useMatch();

    return (
        <div>
          <h2>Topics</h2>
    
          <ul>
            <li>
              <Link to={`${match.url}/admin`}>Components</Link>
            </li>
            <li>
              <Link to={`${match.url}/props-v-state`}>
                Props v. State
              </Link>
            </li>
          </ul>
          {/* The Topics page has its own <Routes> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Routes>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Routes>
    </div>
  );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
  }