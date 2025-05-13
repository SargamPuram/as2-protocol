import crypto from 'crypto';

// Function to sign a message using RSA and SHA256
export const signMessage = (message, privateKey) => {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(JSON.stringify(message)); // Sign the stringified version of the message
    sign.end();
    return sign.sign(privateKey, 'base64'); // Return the signature in base64 format
};

// Function to verify a signature using RSA and SHA256
export const verifySignature = (message, signature, publicCert) => {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(JSON.stringify(message)); // Verify the stringified message
    verify.end();
    return verify.verify(publicCert, signature, 'base64'); // Verify the signature
};
