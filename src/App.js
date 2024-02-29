import logo from './logo.svg';
import './App.css';
import Election from './Election';
import Results from './Results'
import React, { useState, useEffect } from 'react'



function App() {
  const [electionPage, setElectionPage] = useState(true)
  const userId = localStorage.getItem('userId')
  console.log('here is userId')
  console.log(userId)
  return (

    <div className="App">
      {!userId ? (

        electionPage ?
          <Election setElectionPage={setElectionPage} />
          :
          <Results />

      ) : <Results voted={userId} />
      }
    </div>
  );
}

export default App;
