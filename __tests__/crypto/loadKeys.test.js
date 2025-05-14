import { loadKeyPair } from "../../src/crypto/loadKeys.js";

describe('Key Loading', () => {
  it('loads private and public keys for partyA', () => {
    const keys = loadKeyPair('partyA');

    expect(keys).toHaveProperty('privateKey');
    expect(keys.privateKey).toContain('-----BEGIN PRIVATE KEY-----');

    expect(keys).toHaveProperty('publicCert');
    expect(keys.publicCert).toContain('-----BEGIN CERTIFICATE-----');  // Changed to BEGIN CERTIFICATE

    expect(keys).toHaveProperty('publicPem');
    expect(keys.publicPem).toContain('-----BEGIN CERTIFICATE-----');  // This might still fail unless you extract the public key
  });

  it('throws error for non-existent party', () => {
    expect(() => loadKeyPair('notARealParty')).toThrow();
  });
});
