import React, { Component } from 'react';
//import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import StateList from './states';
import State_info from './state_info';
//import { useParams } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continents: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/continent')
      .then((res) => {
        this.setState({ continents: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  render() {
    const { continents } = this.state;
    continents.data = continents.data || []

    /*const Wrapper = (props) => {
      const params = useParams();
      return <StateList {...{ ...props, match: { params } }} />
    }*/

    return (
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">Project: </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {continents.data.map((c) => (
                  <li className="nav-item" key={c.continent}>
                    <Link className="nav-link" to={`/continent/${c.continent}`}>
                      {c.continent}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Routes>
                <Route path="/continent/:continent" element={<StateList />} />
                <Route path="/country/:country" element={<State_info />} />
              </Routes>
            </div>
          </div>
        </div>

      </div>
    );
  }

}

