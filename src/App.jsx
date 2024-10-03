import { Routes, Route } from 'react-router-dom'
import VotingPage from './VotingPage'
import HashVerificationPage from './HashVerificationPage'
import './App.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/verify" element={<HashVerificationPage />} />
      </Routes>
    </>
  );
}


export default App;
