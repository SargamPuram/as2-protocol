import 'dotenv/config'
import { readFileSync } from 'fs'
import path from 'path'




// src/config/env.js
export const AS2_PARTY_A = {
  privateKey: './certs/partyA/private.key',
  publicCert: './certs/partyA/public.crt',
};

export const AS2_PARTY_B = {
  privateKey: './certs/partyB/private.key',
  publicCert: './certs/partyB/public.crt',
};

export const AS2_URL = 'http://example.com'; // Your AS2 communication endpoint
