import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ol>
      {props.repos.map(item =>
      <li key={item._id}>
        <a href={item.url}>{item.repo.name}</a> +
        {` by ${item.owner.name} with ${item.rating} stars`}
      </li>
      )}
    </ol>
  </div>
)

export default RepoList;