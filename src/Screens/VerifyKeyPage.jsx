import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyKeyPage.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function VerifyKeyPage() {
    const [hash, setHash] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getPid = async () => {
      try {
          const response = await api.get('/pollingStations/' + import.meta.env.VITE_PORT);
          const pid = response.data.pollingStation;
          return pid;
      } catch (err) {
        if (err.response.status === 400) {
          toast.error('Koden er ugyldig');
        }
      }
    };
    // Mock verification function for example purposes
    const verifyHash = async (hash) => {
      try {
          const pid = await getPid();
          const response = await api.post('/key/verify', { key: hash, pollingStation: pid });
          const jwt = response.data;
          
          return jwt;
      } catch (err) {
          // invalid key hash
          console.log(err.response.status);
          if (err.response.status === 401) {
            toast.error('Forkert nøgle, prøv venligst igen.');
            console.log(err.response.status + 'hej');
            return null;
          } else {
            // eslint-disable-next-line no-console
            console.error('Error verifying key:', err);
            return null;
          }
      }
  };

  const handleVerification = async () => {
    const jwt = await verifyHash(hash);  // Wait for verification result

    if (jwt) {
        // If verified, store JWT in session storage and navigate to the voting page
        sessionStorage.setItem('jwt', jwt);
        navigate('/voting');
    } else {
        // Display error if verification fails
        setError('Forkert nøgle, prøv venligst igen.');
    }
};

    return (
      <>
        <div className='verify-key-page-div'>
            <h1>Indtast nøgle</h1>
            <p className='enter-key-text'>Indtast nøglen som De har modtaget ved skranken.</p>
            <input 
                className="key-input" 
                type="text" 
                placeholder="Indtast din nøgle her" 
                value={hash} 
                onChange={(e) => setHash(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleVerification();
                    }
                }}
            />
            <button className="key-button" onClick={handleVerification}>Log ind</button>
            {error && <p className="error-message">{error}</p>}
        </div>
        <button className='verify-button' onClick={() => navigate('/verify')}>Verificer din stemme</button>
      </>
    );
}

export default VerifyKeyPage;