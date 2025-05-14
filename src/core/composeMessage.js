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

        // Ensure keys are loaded correctly
        if (!partyAKeys || !partyAKeys.privateKey || !partyAKeys.publicCert) {
            throw new Error('Party A keys are not loaded properly');
        }
        if (!partyBKeys || !partyBKeys.publicCert) {
            throw new Error('Party B keys are not loaded properly');
        }

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

        // Create the agreement object
        const agreement = {
            host: {
                id: 'partyA',
                certificate: partyAKeys.publicCert,
                privateKey: partyAKeys.privateKey,
                sign: 'sha256', // or any appropriate signing algorithm
            },
            partner: {
                id: 'partyB',
                certificate: partyBKeys.publicCert,
                encrypt: 'aes256', // encryption algorithm, adjust as needed
            },
        };

        // Create a new AS2Composer instance
        const composer = new AS2Composer({
            message: {
                content: message, // AS2 message content
                messageId: messageId,
                headers: headers,
            },
            agreement: agreement,
            additionalHeaders: [] // You can add any extra headers here
        });

        // Compile the AS2 message
        const compiledMessage = await composer.compile();

        // Log the results
        console.log('Composed AS2 Message:', compiledMessage);
        console.log('Headers:', compiledMessage.getHeaders());

        return { compiledMessage, headers: compiledMessage.getHeaders() };
    } catch (error) {
        console.error('Error composing AS2 message:', error);
        throw error;  // Ensure the error propagates correctly
    }
};
