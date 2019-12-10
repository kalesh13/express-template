import { Request } from "express";

export class RequestTransform {

    /**
     * Process operations on request contents
     * 
     * @param req Current request instance
     */
    public handle(req: Request) {
        req.body = this.transformRequest(req.body);
        req.params = this.transformRequest(req.params);
        req.query = this.transformRequest(req.query);
    }

    /**
     * Iterate through fields and transform each string
     * fields.
     * 
     * Initial key will be undefined as req.body, req.params
     * and req.query is passed without any keys.
     * 
     * @param item Field value
     * @param key Field key
     */
    private transformRequest(item: any, key?: any): any {

        // If the item is an object, iterate through
        // each property and transform the property.
        if (null !== item && typeof item === 'object') {
            for (let prop in item) {
                item[prop] = this.transformRequest(item[prop], prop);
            }
            return item;
        }

        // If the item is a string, transform the item.
        // Transform function can be different based on the 
        // child class that extends this class.
        if (typeof item === 'string') {
            item = this.transform(item, key);
        }
        return item === undefined ? null : item;
    }

    /**
     * Transforms the request field as required
     * 
     * @param value Transform the value
     * @return string
     */
    public transform(value: string, key: any): string | null {
        return value;
    }
}