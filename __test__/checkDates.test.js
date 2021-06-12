
import { checkDates } from "../src/client/js/formHandler";

describe('Testing correct alerts', () => {
    
    test('Testing days to start 0', () => {
        
        expect(checkDates(0, 0, 0)).toBe(true)
    })
    test('Testing startday > endday', () => {
        
        expect(checkDates(0, 2021-12-10, 2021-11-11)).toBe(true)
    })
})