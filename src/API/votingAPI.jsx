import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const getPartyCandidates = async (partyId) => {
    const response = await api.get('/candidates?partyId=' + partyId);
    return response.data;
};

const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

const voteForCandidate = async (candidateId) => {
    const response = await api.post('/vote/candidate', { candidateId });
    return response.data;
};

const voteForParty = async (partyId) => {
    const response = await api.post('/vote/party', { partyId });
    return response.data;
};

const voteBlank = async () => {
    const response = await api.post('/vote/blank');
    return response.data;
};

export { getPartyCandidates, getParties, voteForCandidate, voteForParty, voteBlank };