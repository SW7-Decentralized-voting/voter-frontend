import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HashVerificationPage.css';

function HashVerificationPage() {
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
        <div>
            <h1>Verify your vote</h1>
            <p>Enter the hash of your vote below to verify that it has been counted correctly.</p>
            <input 
                className="hash-field" 
                type="text" 
                placeholder="#########" 
                value={hash} 
                onChange={(e) => setHash(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleVerification();
                    }
                }}
            />
            <button onClick={handleVerification}>Verify</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default HashVerificationPage;
