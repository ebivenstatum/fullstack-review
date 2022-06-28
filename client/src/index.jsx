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

  }

  search(username) {
    console.log(`${username} was searched`);

    // TODO: post request upon searching a username
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'POST',
      contentType: 'application/json',
      data: username,
      success: (data) => {
        console.log('Successful POST!');
        $.ajax({
          url: 'http://localhost:1128/repos',
          type: 'GET',
          contentType: 'application/json',
          data: username,
          success: (repoData) => {
            console.log('Successful GET!');
            this.setState({ repos: repoData })
          },
          error: (err) => {
            console.log('Failed GET!', err);
          }
        });
      },
      error: (err) => {
        console.log('Failed POST!', err)
      }

    });

  }



  componentDidMount() {

    axios.get('/repos').then(res => {
      this.setState({repos: JSON.parse(res)});
    });

  }

  render() {

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
      <p>{this.state.repos}</p>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));