// ref: https://stackoverflow.com/questions/50818474/how-to-properly-test-if-the-type-of-the-result-is-a-javascript-function-in-jes
import { updateUI } from "../src/client/js/updateUI"

describe('updateUI() must be a function' , () => {
    test('Should be function', () => {
        expect(typeof updateUI).toBe("function");
    });
})