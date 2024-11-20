import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const blockchainApi = axios.create({
    baseURL: import.meta.env.VITE_BLOCKCHAIN_API_URL,
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
    const response = await blockchainApi.post('/vote', body, {
        headers: {
            Authorization: sessionStorage.getItem('jwt'),
        }
    });
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
};

export { getPartyCandidates, getParties, vote };
