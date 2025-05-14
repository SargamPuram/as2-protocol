import fs from 'fs';
import path from 'path';

// Use __dirname directly, which should work in both CommonJS and ESM modules
const __dirname = path.resolve();

export function loadKeyPair(partyName) {
  // Resolve the path to the certs folder and party's key files
  const certsPath = path.resolve(__dirname, './certs', partyName);

  // Log the resolved certs path to verify correctness
  console.log('Resolved certs path:', __dirname);

  try {
    const privateKey = fs.readFileSync(path.join(certsPath, 'private.key'), 'utf8');
    const publicCert = fs.readFileSync(path.join(certsPath, 'public.crt'), 'utf8');
    const publicPem = fs.readFileSync(path.join(certsPath, 'public.pem'), 'utf8');

    return {
      privateKey,
      publicCert,
      publicPem
    };
  } catch (err) {
    console.error(`Failed to load keys for ${partyName}:`, err.message);
    throw err;
  }
}
