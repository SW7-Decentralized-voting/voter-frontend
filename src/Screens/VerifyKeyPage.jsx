import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyKeyPage.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const blockchainApi = axios.create({
  baseURL: import.meta.env.VITE_BLOCKCHAIN_API_URL,
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
    
    const verifyHash = async (hash) => {
      try {
          const pid = await getPid();
          const response = await blockchainApi.post('/keys/verify', { key: hash, pollingStation: pid });
          const jwt = response.data?.token;
          
          return jwt;
      } catch (err) {
          if (err.response?.status === 401) {
            toast.error('Forkert nøgle, prøv venligst igen.');
            return null;
          } else {
            // eslint-disable-next-line no-console
            console.error('Error verifying key:', err);
            return null;
          }
      }
  };

  const handleVerification = async () => {
    const jwt = await verifyHash(hash);

    if (jwt) {
        sessionStorage.setItem('jwt', jwt);
        navigate('/voting');
    } else {
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
