import { EmptyStrings } from "../../app/middlewares/classes/EmptyStrings";

describe('Empty string to null conversion', () => {
    let emptyNull = new EmptyStrings()

    // Check if a non empty string is getting
    // nulled by the middleware.
    it('Empty string not executed', () => {
        let transformedString = emptyNull.transform("hello ");
        expect(transformedString).toBe("hello ");
    });

    // Check if an empty string is getting nulled
    // by the middleware. Only empty string should return a 
    // null value.
    it('Empty string executed', () => {
        let transformedString = emptyNull.transform("");
        expect(transformedString).toBeNull();
    });

    // Check if any false value like 0, false, undefined
    // gets nulled by the middleware. Middleware should
    // return the same value that is sent to the middleware.
    it('Empty string check for 0', () => {
        let transformedString = emptyNull.transform("0");
        expect(transformedString).toBe("0");
    });
});