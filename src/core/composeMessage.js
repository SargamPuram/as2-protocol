// src/core/composeMessage.js

import { AS2Composer } from 'libas2';
import { loadKeys } from '../crypto/loadKeys.js';
import { AS2_PARTY_A, AS2_PARTY_B } from '../config/env.js';

export const composeMessage = async () => {
    try {
        // Load keys for both parties
        const partyAKeys = loadKeys('partyA');
        const partyBKeys = loadKeys('partyB');

        // Log the keys and data for debugging
        console.log('Party A Keys:', partyAKeys);
        console.log('Party B Keys:', partyBKeys);

        // Define message data
        const message = 'Your AS2 message content here';
        const messageId = 'unique-message-id';
        const headers = {
            'AS2-From': 'partyA',
            'AS2-To': 'partyB',
            'Subject': 'Test AS2 Message'
        };

        // Log message data for debugging
        console.log('Message:', message);
        console.log('Message ID:', messageId);
        console.log('Headers:', headers);

        // Create a new AS2Composer instance
        const composer = new AS2Composer();

        // Compose the AS2 message
        const { encryptedMessage, headers: composedHeaders } = await composer.composeMessage({
            message,
            messageId,
            headers,
            signPrivateKey: partyAKeys.privateKey,
            signCert: partyAKeys.publicCert,
            encryptCert: partyBKeys.publicCert,
        });

        // Log the results
        console.log('Composed AS2 Message:', encryptedMessage);
        console.log('Headers:', composedHeaders);

        return { encryptedMessage, composedHeaders };
    } catch (error) {
        console.error('Error composing AS2 message:', error);
    }
};
