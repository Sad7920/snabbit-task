const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:5000';

describe('Backend Pricing Hierarchy Tests', () => {
    const makeRequest = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/get-price`, data);
            return response.data.price;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Request failed');
        }
    };

    test('01-12-2024, 60 mins, 2 PM (Sunday) to be Rs.210', async () => {
        const price = await makeRequest({
            sport: 'badminton',
            duration: 60,
            date_time: '2024-12-01T14:00:00',
        });
        expect(price).toBe(210);
    });

    test('04-01-2024, 60 mins, 2 PM (Thursday) to be Rs.205', async () => {
        const price = await makeRequest({
            sport: 'badminton',
            duration: 60,
            date_time: '2024-01-04T14:00:00',
        });
        expect(price).toBe(205);
    });

    test('05-01-2024, 60 mins, 2 PM (Friday) to be Rs.190', async () => {
        const price = await makeRequest({
            sport: 'badminton',
            duration: 60,
            date_time: '2024-01-05T14:00:00',
        });
        expect(price).toBe(190);
    });

    test('05-01-2024, 60 mins, 4 PM (Friday) to be Rs.220', async () => {
        const price = await makeRequest({
            sport: 'badminton',
            duration: 60,
            date_time: '2024-01-05T16:00:00',
        });
        expect(price).toBe(220);
    });

    test('05-01-2024, 60 mins, 10 AM (Friday) to be Rs.200', async () => {
        const price = await makeRequest({
            sport: 'badminton',
            duration: 60,
            date_time: '2024-01-05T10:00:00',
        });
        expect(price).toBe(200);
    });
});
