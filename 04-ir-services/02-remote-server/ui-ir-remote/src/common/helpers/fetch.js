import axios from 'axios';

const instance = axios.create({
	// baseURL: if different domain
	timeout: 3000
})

export default instance;