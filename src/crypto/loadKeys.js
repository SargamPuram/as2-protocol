import fs from 'fs';
import path from 'path';

export const loadKeys = (party) => {
    // Absolute path to the certs folder
    const certsPath = path.resolve('/home/sargam/things/kusol/as2-protocol/certs', party);

    // Log the paths to verify correctness
    console.log('Private Key Path:', path.join(certsPath, 'private.key'));
    console.log('Public Cert Path:', path.join(certsPath, 'public.crt'));

    const privateKey = fs.readFileSync(path.join(certsPath, 'private.key'), 'utf8');
    const publicCert = fs.readFileSync(path.join(certsPath, 'public.crt'), 'utf8');
    return { privateKey, publicCert };
};
