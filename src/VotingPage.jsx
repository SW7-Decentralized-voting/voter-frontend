import { useEffect, useRef, useState} from 'react'
import { getPartyCandidates, getParties, voteForCandidate, voteForParty, voteBlank } from './API/votingAPI'
import './VotingPage.css'

function VotingPage() {
    const [parties, setParties] = useState([]);
    const [partyCandidates, setPartyCandidates] = useState({});
    const [selectedParty, setSelectedParty] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const hasFetchedData = useRef(false);
  
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
        console.log('Parties:', fetchedParties);
        setParties(fetchedParties);
        
        const candidatesData = {};
        for (const party of fetchedParties) {
          const candidates = await fetchPartyCandidates(party.id);
          candidatesData[party.id] = candidates;
          console.log('Candidates for party', party.id, candidates);
        }
        setPartyCandidates(candidatesData);
        hasFetchedData.current = true
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
    
    const handleCastVote = async () => {
      if (selectedParty) {
        await voteForParty(selectedParty);
      } else if (selectedCandidate) {
        await voteForCandidate(selectedCandidate);
      } else {
        voteBlank();
      }
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
              ))}
            </div>
          </div>
        ))}
        <button className='submit-button' disabled={!selectedParty && !selectedCandidate} onClick={handleCastVote}>
          Stem
        </button>
      </>
    );
  }

export default VotingPage;