import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

class ApiService {
    constructor() {
        this.instance = instance;
    }

    get(url) {
        return this.instance.get(url);
    }

    post(url, data) {
        return this.instance.post(url, data);
    }
}

const apiService = new ApiService();

export default apiService;