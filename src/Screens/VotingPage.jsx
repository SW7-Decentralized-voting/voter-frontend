import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPartyCandidates, getParties, voteForCandidate, voteForParty, voteBlank } from '../API/VotingAPI';
import './VotingPage.css';

function VotingPage() {
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [partyCandidates, setPartyCandidates] = useState({});
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isTextLarge, setIsTextLarge] = useState(false); // New state variable
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
      setParties(fetchedParties);

      const candidatesData = {};
      for (const party of fetchedParties) {
        const candidates = await fetchPartyCandidates(party._id);
        candidatesData[party._id] = candidates;
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
  };

  const handleSelectCandidate = (event) => {
    const candidateId = event.target.value;
    setSelectedCandidate(candidateId === selectedCandidate ? null : candidateId);
    setSelectedParty(null);
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
    navigate('/login');
  };

  return (
    <>
      <div className="header">
        <h1>Folketingsvalget 20xx</h1>
        <div className="upper-right-text">Opstillingskreds</div>
      </div>
      <button className="text-size-button" onClick={() => setIsTextLarge(!isTextLarge)}>
        {isTextLarge ? 'Normal tekststørrelse' : 'Forstør tekst'}
      </button>
      <h3 className={`${isTextLarge ? 'large-text' : ''}`}>Sæt X i rubrikken til venstre for et partinavn eller et kandidatnavn.</h3>
      <p className={`${isTextLarge ? 'large-text' : ''}`}>Du kan kun sætte ét X på stemmesedlen.</p>
      {(parties?.length ?? 0) === 0 && <p>Indlæser...</p>}
      {parties.map((party) => (
        <div className="party-container" key={party._id}>
          <label className={`party-label ${isTextLarge ? 'large-text' : ''}`}>
            <input
              className="party-checkbox"
              type="checkbox"
              name="party"
              value={party._id}
              onChange={handleSelectParty}
              checked={selectedParty === party._id}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSelectParty(e);
                  selectedParty === party._id ? e.preventDefault() : null;
                }
              }}
            />
            {party.name}
          </label>
          <div className="candidate-list">
            {partyCandidates[party._id] &&
              partyCandidates[party._id].map((candidate) => (
                <div key={candidate._id} className="candidate">
                  <label className={`candidate-label ${isTextLarge ? 'large-text' : ''}`}>
                    <input
                      className="candidate-checkbox"
                      type="checkbox"
                      name="candidate"
                      value={candidate._id}
                      onChange={handleSelectCandidate}
                      checked={selectedCandidate === candidate._id}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSelectCandidate(e);
                          selectedCandidate === candidate._id ? e.preventDefault() : null;
                        }
                      }}
                    />
                    {candidate.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      ))}
      <button
        className="submit-button"
        onClick={handleCastVote}
      >
        Stem
      </button>
    </>
  );
}

export default VotingPage;