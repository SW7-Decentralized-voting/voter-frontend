import { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getPartyCandidates, getParties, voteForCandidate, voteForParty, voteBlank } from '../API/VotingAPI';
import './VotingPage.css';

function VotingPage() {
    const navigate = useNavigate();
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
          const candidates = await fetchPartyCandidates(party._id);
          candidatesData[party._id] = candidates;
          console.log('Candidates for party', party._id, candidates);
        }
        setPartyCandidates(candidatesData);
        hasFetchedData.current = true;
      };
    
      fetchData();
    }, []);
  
    const handleSelectParty = (event) => {
      const partyId = event.target.value;
      setSelectedParty(partyId === selectedParty ? null : partyId);
      setSelectedCandidate(null);
      console.log('Selected party:', partyId);
    };
  
    const handleSelectCandidate = (event) => {
      const candidateId = event.target.value;
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
      setSelectedParty(null);
      setSelectedCandidate(null);
      sessionStorage.setItem('verified', 'false');
      navigate('/verify');
    };
  
    return (
      <>
        <div className="header">
          <h1>Folketingsvalget 20xx</h1>
          <div className="upper-right-text">Opstillingskreds</div>
        </div>
        <h3>Sæt X i rubrikken til venstre for et partinavn eller et kandidatnavn.</h3>
        <p>Du kan kun sætte ét X på stemmesedlen.</p>
        {parties.length === 0 && <p>Indlæser...</p>}
        {parties.map((party) => (
          <div className='party-container' key={party._id}>
            <label className='party-label'>
              <input
                className='party-checkbox'
                type='checkbox'
                name='party'
                value={party._id}
                onChange={handleSelectParty}
                checked={selectedParty === party._id}
              />
              {party.name}
            </label>
            <div className='candidate-list'>
              {partyCandidates[party._id] && partyCandidates[party._id].map((candidate) => (
                <div key={candidate._id} className='candidate'>
                  <label className='candidate-label'>
                    <input
                      className='candidate-checkbox'
                      type='checkbox'
                      name='candidate'
                      value={candidate._id}
                      onChange={handleSelectCandidate}
                      checked={selectedCandidate === candidate._id}
                    />
                    {candidate.name}
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