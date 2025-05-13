// src/core/verifyCerts.js
import { AS2Composer } from 'libas2';
import { loadKeys } from '../crypto/loadKeys.js';
import { AS2_PARTY_A, AS2_PARTY_B } from '../config/env.js';

export const verifyCerts = async (receivedMessage, receivedHeaders) => {
    const partyAKeys = loadKeys('partyA');
    const partyBKeys = loadKeys('partyB');

    const composer = new AS2Composer();

    // Verify the message and certificate
    const verificationResult = await composer.verifyMessage({
        receivedMessage,
        receivedHeaders,
        verifyCert: partyBKeys.publicCert,
        decryptPrivateKey: partyBKeys.privateKey,
        decryptCert: partyAKeys.publicCert,
    });

    if (verificationResult.isValid) {
        console.log('AS2 Message is valid!');
    } else {
        console.log('Invalid AS2 Message');
    }
};
