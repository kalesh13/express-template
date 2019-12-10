import { readManifest } from "./manifest";

export default function (path: string): string {

    let manifest = readManifest();

    path = (path.charAt(0) === '/' ? path : '/' + path);

    // If manifest file is missing or the manifest does not
    // contain the file details, return the path itself for 
    // safety. App check for the default file path and if it is
    // not found 404 will be returned.

    if (!manifest || !manifest.hasOwnProperty(path)) {
        console.log('Missing file details in manifest: ' + path);

        return path;
    }
    return manifest[path];
}