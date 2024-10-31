import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyKeyPage.css';

function VerifyKeyPage() {
    const [hash, setHash] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Mock verification function for example purposes
    const verifyHash = (inputHash) => {
        // Replace with actual verification logic or API call
        return inputHash === 'password';
    };

    const handleVerification = () => {
        if (verifyHash(hash)) {
            // If verified, set session storage and navigate to /voting
            sessionStorage.setItem('verified', 'true');
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