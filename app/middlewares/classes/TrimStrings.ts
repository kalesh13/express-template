import { RequestTransform } from "./RequestTransform";

export class TrimStrings extends RequestTransform {

    private except = ['password', 'password_confirmation'];

    /**
     * Trim value if the key is not part of
     * exception.
     * 
     * @param value Field value
     * @param key Field key
     */
    public transform(value: string, key?: string): string {

        // Check if the key exists in the exception
        // list. If exists return the value as it is.
        //
        // Password and password_confirmation should not 
        // trim characters.        
        if (undefined !== key && this.except.includes(key)) {
            return value;
        }

        return typeof value === 'string' ? value.trim() : value;
    }
}