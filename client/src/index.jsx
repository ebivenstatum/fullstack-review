import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this);

  }

  search(username) {
    console.log(`${username} was searched`);

    // TODO: post request upon searching a username
    var newRepos;

    $.post('/repos', {term: username});
    $.get('/repos', (data) => {
      if (data) {
        newRepos = JSON.parse(data);
        this.updateState.bind(this);
        this.updateState(newRepos);
        console.log('retrieved');
      } else {
        console.log('couldnt retrieve data from server')
      }
    });

  }

  updateState(data) {
    this.setState({
      repos: data
    });
    console.log(this.state.repos)
  }

  updateRepos() {
    var newRepos;

    //$.post('/repos');
    $.get('/repos', (data) => {
      if (data) {
        newRepos = JSON.parse(data);
        this.updateState.bind(this);
        this.updateState(newRepos);
      } else {
        console.log('couldnt retrieve data from server')
      }
    });

  }

  componentDidMount() {
    this.updateRepos();
  }

  render() {

    return (<div>
      <h1>Github Fetcher</h1>
      <button onClick={this.updateRepos.bind(this)}>Update</button>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search/*.bind(this)*/} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));