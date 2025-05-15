import { AS2Composer } from 'libas2';
import { loadKeyPair } from '../crypto/loadKeys.js';

/**
 * Function to create and compile an AS2 message dynamically
 * @param {string} partyName - The name of the party (e.g., 'partyA', 'partyB')
 * @param {string} messageContent - The content of the message (e.g., order details, invoices)
 * @returns {Promise<AS2MimeNode>} - Compiled AS2 message
 */
export async function composeAS2Message(partyName, messageContent) {
    try {
        // Load the key pairs for the sender and receiver
        const { privateKey, publicCert } = loadKeyPair(partyName);
        const { publicCert: receiverCert } = loadKeyPair('partyB');
    
        console.log('Sender cert starts with:', publicCert.slice(0, 30));
        console.log('Receiver cert starts with:', receiverCert.slice(0, 30));
        
        const name = 'John Doe'; // Replace with dynamic value
        const payload = JSON.stringify({ name: name, otherData: 'value' });

        // Options for the AS2 message composition
        const options = {
            message: {
              content: payload,
              contentType: 'application/edi-x12',
              filename: 'data.edi',
            },
            agreement: {
              host: {
                id: 'partyA',
                certificate: publicCert,    // from sender keys
                privateKey: privateKey,     // from sender keys
                sign: 'sha-256',
                name: 'PartyA',
                url: 'https://partyA.example.com/as2',
                mdn: {
                  signing: 'sha-256',
                  async: true,
                  url: 'https://partyA.example.com/mdn',
                },
              },
              partner: {
                role: 'partner',
                id: 'partyB',
                certificate: receiverCert,   // from receiver keys
                encrypt: 'aes256-CBC',
                name: 'PartyB',
                url: 'https://partyB.example.com/as2',
                mdn: {
                  signing: 'sha-256',
                  async: true,
                  url: 'https://partyB.example.com/mdn',
                },
              },
            },
            additionalHeaders: [
              { key: 'X-AS2-From', value: 'partyA' },
              { key: 'X-AS2-To', value: 'partyB' },
            ],
          };
          
        // Log options to check if they are correct
        console.log('Signing options:', options);

        // Create the AS2Composer instance
        const composer = new AS2Composer(options);

        console.log("composer instance:", composer);

        // Compile the message
        const compiledMessage = await composer.compile();
        console.log('Compiled AS2 Message:', compiledMessage);
        
        return compiledMessage;
    } catch (error) {
        console.error('Error while composing AS2 message:', error);
    }
}
