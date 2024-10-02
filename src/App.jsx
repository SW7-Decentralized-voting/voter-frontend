import { useEffect, useState } from 'react'
import { getPartyCandidates, getParties } from './API/votingAPI'
import './App.css'
import './VotingPage.css'

function App() {
  const [selectedParty, setSelectedParty] = useState('');
  const [parties, setParties] = useState([]);
  const [partyCandidates, setPartyCandidates] = useState([]);

  const fetchParties = async () => {
    const parties = await getParties();
    setParties(parties);
  };

  const fetchPartyCandidates = async () => {
    const candidates = await getPartyCandidates();
    setPartyCandidates(candidates);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchParties();
      for (const party of parties) {
        await fetchPartyCandidates(party.id);
      }
    };
  
    fetchData();
  }, []);

  const handleSelectParty = (event) => {
    setSelectedParty(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
    <h1> Folketingsvalget 20xx</h1>
    {parties.map((party) => (
    <div className='party-container' key={party.id}> 
      <label className='party-label'>
        <input className='party-checkbox' type='checkbox' name='party' value={party.id} onChange={handleSelectParty} />
        {party.partyName}
      </label>
    </div>
    
    ))}
    </>
  )
}

export default App
