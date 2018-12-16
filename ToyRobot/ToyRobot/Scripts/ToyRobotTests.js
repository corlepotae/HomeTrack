var ValidInputHandlingTests = [
    { input: ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'], expected: '0,1,NORTH' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'], expected: '0,0,WEST' },
    { input: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'], expected: '3,3,NORTH' }
]
var InvalidInputHandlingTests = [
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'MOVE', 'REPORT'], expected: '0,0,WEST' },
]

describe("ToyRobot Tests", function () {
    it("Follows valid inputs correctly", function () {
        for (var test of ValidInputHandlingTests) {
            expect(false).toBeTruthy();
        }
    });
    it("Handles invalid inputs correctly", function () {
        for (var test of InvalidInputHandlingTests) {
            expect(false).toBeTruthy();
        }
    });
});