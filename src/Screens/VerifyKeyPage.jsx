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
            setError('Invalid hash. Please try again.');
        }
    };

    return (
      <>
        <div>
            <h1>Enter key</h1>
            <p>Enter the key you received below.</p>
            <input 
                className="hash-field" 
                type="text" 
                placeholder="Enter your key here" 
                value={hash} 
                onChange={(e) => setHash(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleVerification();
                    }
                }}
            />
            <button onClick={handleVerification}>Login</button>
            {error && <p className="error-message">{error}</p>}
        </div>
        <button className='verify-button' onClick={() => navigate('/verify')}>Verify your vote</button>
      </>
    );
}

export default VerifyKeyPage;