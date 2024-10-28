import './HashVerificationPage.css';

function HashVerificationPage() {
    return (
        <div>
            <h1>Verify your vote</h1>
            <p>Enter the hash of your vote below to verify that it has been counted correctly.</p>
            <input className="hash-field" type='text' placeholder='#########' />
            <button>Verify</button>
        </div>
    );
}

export default HashVerificationPage;