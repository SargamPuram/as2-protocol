// src/index.js

import { composeMessage } from './core/composeMessage.js';
import { verifyCerts } from './crypto/verifyCerts.js';
import { parseMessage } from './core/parseMessage.js';
import { generateMDN, processMDN } from './core/mdn.js';  // Import MDN functions

const run = async () => {
    try {
        // Step 1: Compose and send the message (simulated)
        const { encryptedMessage, composedHeaders } = await composeMessage();
        console.log('Message Composed and Encrypted:', encryptedMessage);

        // Step 2: Simulate receiving the message and parsing it
        const parsedMessage = await parseMessage(encryptedMessage, composedHeaders);

        if (parsedMessage.isValid) {
            console.log('AS2 Message parsed and verified successfully.');
        } else {
            console.log('AS2 Message verification failed.');
        }

        // Step 3: Generate and send the MDN response
        const mdnResponse = await generateMDN(parsedMessage);
        console.log('MDN Generated:', mdnResponse);

        // Step 4: Simulate receiving the MDN and processing it
        const mdnProcessingResult = await processMDN(mdnResponse);
        console.log('MDN Processed:', mdnProcessingResult);

    } catch (error) {
        console.error('Error:', error);
    }
};

// Run the process
run();
