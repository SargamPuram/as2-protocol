import axios from 'axios';

export async function sendAS2Message(payload, headers, toURL) {
  return axios.post(toURL, payload, { headers });
}
