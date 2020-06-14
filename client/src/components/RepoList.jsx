import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
<div className='wrapper'>
<div className='entry'>
  <span className='column'>Avatar</span>
  <span className='column'>Name</span>
  <span className='column'>Forks</span>
  <span className='column'>Watchers</span>
  <span className='column'>Stargazers</span>
  <span className='column'>Created</span>
</div>
{props.repos.map((repo)=> (
  <div className='entry' id={repo.id}>
    <span className='column'><a href={repo.html_url}><img src={repo.avatar_url} height='100%' width='100%'/></a></span>
    <span className='column'>{repo.name}</span>
    <span className='column'>{repo.forks}</span>
    <span className='column'>{repo.watchers}</span>
    <span className='column'>{repo.stargazers}</span>
    <span className='column'>{repo.created}</span>
  </div>
))}
</div>
</div>
);

export default RepoList;