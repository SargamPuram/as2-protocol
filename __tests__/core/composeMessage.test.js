import { composeAS2Message } from "../../src/core/composeMessage.js";
import { webcrypto } from 'node:crypto';

// Ensure WebCrypto is available globally in the test environment
beforeAll(() => {
  globalThis.crypto = webcrypto;
});

describe('composeAS2Message', () => {

    it('should compose a valid AS2 message with dynamic content', async () => {
      const messageContent = `Order Confirmation:
                  - Order ID: 12345
                  - Product: Widget A
                  - Quantity: 100
                  - Price: $10.00 each
                  - Total: $1000.00
                  Thank you for your business!`;
  
      // Call the actual composeAS2Message function
      const compiledMessage = await composeAS2Message('partyA', messageContent);
  
      console.log('Compiled Message Structure:', compiledMessage); // Log full compiled message
  
      // Test the results
      expect(compiledMessage).toBeDefined(); // Ensure the compiled message is defined
      expect(compiledMessage.payload).toBe(messageContent); // Ensure the payload matches the input message
      expect(compiledMessage.headers['X-AS2-From']).toBe('partyA'); // Check if 'X-AS2-From' header is correctly set
      expect(compiledMessage.headers['X-AS2-To']).toBe('partyB'); // Check if 'X-AS2-To' header is correctly set
    });
  
    it('should handle an empty message content gracefully', async () => {
      const emptyMessage = '';
  
      // Call the actual composeAS2Message function with an empty message
      const compiledMessage = await composeAS2Message('partyA', emptyMessage);
  
      console.log('Compiled Empty Message:', compiledMessage); // Log for debugging
  
      // Test the results
      expect(compiledMessage).toBeDefined(); // Ensure the compiled message is defined
      expect(compiledMessage.payload).toBe(emptyMessage); // Ensure the payload is empty as input
    });
});