import fs from 'fs';
import path from 'path';

export const readManifest = function (): any {
    const manifestPath = path.resolve('public', 'mix-manifest.json');

    if (!fs.existsSync(manifestPath)) {
        console.log('Missing manifest.json file');

        return null;
    }
    return JSON.parse(fs.readFileSync(manifestPath).toString());
}