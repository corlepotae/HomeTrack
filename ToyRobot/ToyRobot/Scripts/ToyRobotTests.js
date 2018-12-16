var TurningTests = [
    { input: ['RIGHT'], expected: 'EAST' },
    { input: ['RIGHT', 'RIGHT'], expected: 'SOUTH' },
    { input: ['RIGHT', 'RIGHT', 'RIGHT'], expected: 'WEST' },
    { input: ['RIGHT', 'RIGHT', 'RIGHT', 'RIGHT'], expected: 'NORTH' },
    { input: ['LEFT'], expected: 'WEST' },
    { input: ['LEFT', 'LEFT'], expected: 'SOUTH' },
    { input: ['LEFT', 'LEFT', 'LEFT'], expected: 'EAST' },
    { input: ['LEFT', 'LEFT', 'LEFT', 'LEFT'], expected: 'NORTH' }
]

var ValidInputHandlingTests = [
    { input: ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'], expected: '0,1,NORTH' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'], expected: '0,0,WEST' },
    { input: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'], expected: '3,3,NORTH' }
]
var InvalidInputHandlingTests = [
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'MOVE', 'REPORT'], expected: '0,0,WEST' },
]

describe("ToyRobot should", function () {
    it("turns correctly", function () {
        for (var test of TurningTests) {
            robot = new Robot(4, 4, 0, 0, Robot.Direction.NORTH);
            for (var turn of test.input) {
                robot.takeCommand(turn);
            }
            expect(Robot.Direction.GetName(robot.f)).toBe(test.expected);
        }
    });
    //it("follows valid inputs correctly", function () {
    //    for (var test of ValidInputHandlingTests) {
    //        expect(false).toBeTruthy();
    //    }
    //});
    //it("handles invalid inputs correctly", function () {
    //    for (var test of InvalidInputHandlingTests) {
    //        expect(false).toBeTruthy();
    //    }
    //});
});