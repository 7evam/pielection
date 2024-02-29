import logo from './logo.svg';
import './App.css';
import Election from './Election';
import Results from './Results'
import React, { useState, useEffect } from 'react'



function App() {
  const [electionPage, setElectionPage] = useState(true)
  return (

    <div className="App">
      {
        electionPage ?
          <Election setElectionPage={setElectionPage} />
          :
          <Results />
      }

    </div>
  );
}

export default App;
