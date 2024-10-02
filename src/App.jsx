import { useEffect, useState } from 'react'
import { getPartyCandidates, getParties } from './API/votingAPI'
import './App.css'
import './VotingPage.css'

function App() {
  const [parties, setParties] = useState([]);
  const [partyCandidates, setPartyCandidates] = useState({});
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const fetchParties = async () => {
    const parties = await getParties();
    return parties;
  };

  const fetchPartyCandidates = async (partyId) => {
    const candidates = await getPartyCandidates(partyId);
    return candidates;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedParties = await fetchParties();
      setParties(fetchedParties);
      
      const candidatesData = {};
      for (const party of fetchedParties) {
        const candidates = await fetchPartyCandidates(party.id);
        candidatesData[party.id] = candidates;
      }
      setPartyCandidates(candidatesData);
    };
  
    fetchData();
  }, []);

  const handleSelectParty = (event) => {
    const partyId = Number(event.target.value);
    setSelectedParty(partyId === selectedParty ? null : partyId);
    setSelectedCandidate(null);
    console.log('Selected party:', partyId);
  };

  const handleSelectCandidate = (event) => {
    const candidateId = Number(event.target.value);
    setSelectedCandidate(candidateId === selectedCandidate ? null : candidateId);
    setSelectedParty(null);
    console.log('Selected candidate:', candidateId);
  };

  return (
    <>
      <h1>Folketingsvalget 20xx</h1>
      {parties.map((party) => (
        <div className='party-container' key={party.id}>
          <label className='party-label'>
            <input
              className='party-checkbox'
              type='checkbox'
              name='party'
              value={party.id}
              onChange={handleSelectParty}
              checked={selectedParty === party.id}
            />
            {party.partyName}
          </label>
          <div className='candidate-list'>
            {partyCandidates[party.id] && partyCandidates[party.id].map((candidate) => (
              <div className='candidate-contaier'>
                <div key={candidate.id} className='candidate'>
                  <label className='candidate-label'>
                    <input
                      className='candidate-checkbox'
                      type='checkbox'
                      name='candidate'
                      value={candidate.id}
                      onChange={handleSelectCandidate}
                      checked={selectedCandidate === candidate.id}
                    />
                    {candidate.full_name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default App
