import 'dotenv/config';

export const parties = {
  A: {
    name: 'PartyA',
    url: process.env.PARTY_A_URL,
    cert: './certs/partyA.crt',
    key: './certs/partyA.key',
    id: 'PARTY_A_AS2_ID'
  },
  B: {
    name: 'PartyB',
    url: process.env.PARTY_B_URL,
    cert: './certs/partyB.crt',
    key: './certs/partyB.key',
    id: 'PARTY_B_AS2_ID'
  }
};
