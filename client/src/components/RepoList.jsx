import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ol>
      <li>{props.repos}</li>
    </ol>
  </div>
)

export default RepoList;