import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const getPartyCandidates = async (partyId) => {
    const response = await api.get('/candidates?party=' + partyId);
    return response.data;
};

const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

const vote = async (id) => {
    const body = { id: id };
    const response = await api.post('/vote', body);
    return response.data;
};


export { getPartyCandidates, getParties, vote };
