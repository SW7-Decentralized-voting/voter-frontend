import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyKeyPage.css';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function VerifyKeyPage() {
    const [hash, setHash] = useState('');
    const [pid, setPid] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Mock verification function for example purposes
    const verifyHash = async (hash, pid) => {
      try {
          console.log('Hash:', hash);  // Log hash
          console.log('PID:', pid); 
          const response = await api.post('/key/verify', { key: hash, id: pid });
          const jwt = response.data;
          
          return jwt;
      } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Verification failed:', err);
          return null;
      }
  };

  const handleVerification = async () => {
    const jwt = await verifyHash(hash, pid);  // Wait for verification result

    if (jwt) {
        // If verified, store JWT in session storage and navigate to the voting page
        sessionStorage.setItem('verified', 'true');
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
            <input 
                className="id-input" 
                type="text" 
                placeholder="Indtast valgstedets ID" 
                value={pid} 
                onChange={(e) => setPid(e.target.value)}
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