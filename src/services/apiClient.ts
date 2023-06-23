import md5 from "md5";
import axios from "axios";
import environment from '../../environment';

const timestamp = new Date().getTime();

const { BASE_URL, PRIVATE_KEY, PUBLIC_KEY } = environment;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: md5(timestamp + PRIVATE_KEY + PUBLIC_KEY),
  },
});

export default apiClient;
