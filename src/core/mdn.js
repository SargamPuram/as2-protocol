import { loadKeys } from '../crypto/loadKeys.js'; // Load keys (private and public certs)
import { signMessage, verifySignature } from '../crypto/signing.js'; // Sign and verify from signing.js

// Function to generate the MDN (Message Disposition Notification)
export const generateMDN = async (parsedMessage) => {
    try {
        // Simulate the MDN content based on the parsed message status
        const mdnContent = {
            status: parsedMessage.isValid ? 'Processed' : 'Failed',
            message: parsedMessage.isValid ? 'Message processed successfully' : 'Message verification failed',
            originalMessageId: parsedMessage.messageId,
        };

        // Load Party A's private key to sign the MDN
        const { privateKey: partyAPrivateKey } = loadKeys('partyA');

        // Sign the MDN (this could include more sophisticated logic)
        const signedMDN = signMessage(mdnContent, partyAPrivateKey); // Sign the MDN content with Party A's private key
        return signedMDN;
    } catch (error) {
        console.error('Error generating MDN:', error);
        throw new Error('MDN generation failed');
    }
};

// Function to process the MDN (Message Disposition Notification)
export const processMDN = async (mdnResponse) => {
    try {
        // Load Party A's public cert to verify the MDN signature
        const { publicCert: partyAPublicCert } = loadKeys('partyA');

        // Simulate MDN processing, such as verifying the signature and handling the result
        const isVerified = verifySignature(mdnResponse, mdnResponse.signature, partyAPublicCert); // Verify the signature of the MDN response

        if (isVerified) {
            return 'MDN successfully verified and processed.';
        } else {
            return 'MDN verification failed.';
        }
    } catch (error) {
        console.error('Error processing MDN:', error);
        return 'MDN processing failed';
    }
};
