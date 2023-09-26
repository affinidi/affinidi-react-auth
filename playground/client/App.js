import React from "react";
import logo from './logo.svg';
import './App.css';

import { AffinidiLoginButton, useAffinidiProfile } from 'affinidi-react-auth'

function App() {

  const { isLoading, error, profile, handleLogout } = useAffinidiProfile()

  async function logout() {
    //clear session cookie
    handleLogout();
    window.location.href = "/";
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {!profile && <>
          <AffinidiLoginButton />
        </>}

        {isLoading && <p>Loading...</p>}

        {profile && <>
          <button style={{ marginRight: 10 }} onClick={logout}>
            Logout
          </button>

          <h3>User Profile</h3>
          <pre style={{ textAlign: "left" }}>{JSON.stringify(profile, null, 4)}</pre>
        </>}

        {error && <><h2>error</h2>{error}</>}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
