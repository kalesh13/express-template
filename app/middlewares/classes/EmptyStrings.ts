import { RequestTransform } from "./RequestTransform";

export class EmptyStrings extends RequestTransform {

    /**
     * Set the request value to null if it is
     * an empty string.
     * 
     * @param value Request field value
     * @param key Request field key
     */
    public transform(value: string, key?: string): string | null {
        return typeof value === 'string' && value === '' ? null : value;
    }
}