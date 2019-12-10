import { TrimStrings } from "../../app/middlewares/classes/TrimStrings";

describe('Check trim string', () => {
    let requestTrim = new TrimStrings()

    // Check if the string gets trimmed for the field
    // password. Password & password_confirmation fields
    // are exempted from string trim.
    it('Password check true', () => {
        let trimmedString = requestTrim.transform("hello ", "password");
        expect(trimmedString).toBe("hello ");
    });

    // Check if fields are getting trimmed properly.
    // Use a field name other than password & password_confirmation
    // as these are exemptions
    it('Fields check true', () => {
        let trimmedString = requestTrim.transform(" hello123 ", "name");
        expect(trimmedString).toBe("hello123");
    });
});