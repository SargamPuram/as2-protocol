// src/core/parseMessage.js
import { AS2Composer } from 'libas2';
import { loadKeys } from '../crypto/loadKeys.js';
import { AS2_PARTY_A, AS2_PARTY_B } from '../config/env.js';

export const parseMessage = async (receivedMessage, receivedHeaders) => {
    const partyAKeys = loadKeys('partyA');
    const partyBKeys = loadKeys('partyB');
    
    const composer = new AS2Composer();

    // Parse the received AS2 message and verify
    const parsedMessage = await composer.parseMessage({
        receivedMessage,
        receivedHeaders,
        verifyCert: partyAKeys.publicCert,      // Verify with Party A's public cert
        decryptPrivateKey: partyBKeys.privateKey, // Decrypt with Party B's private key
        decryptCert: partyAKeys.publicCert,      // Decrypt with Party A's public cert
    });

    if (parsedMessage.isValid) {
        console.log('AS2 Message successfully parsed and verified.');
    } else {
        console.log('Failed to parse or verify AS2 Message.');
    }

    return parsedMessage;
};
