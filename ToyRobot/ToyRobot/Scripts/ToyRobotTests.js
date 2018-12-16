var TurningTests = [
    { input: ['PLACE 0,0,NORTH', 'RIGHT'], expected: 'EAST' },
    { input: ['PLACE 0,0,NORTH', 'RIGHT', 'RIGHT'], expected: 'SOUTH' },
    { input: ['PLACE 0,0,NORTH', 'RIGHT', 'RIGHT', 'RIGHT'], expected: 'WEST' },
    { input: ['PLACE 0,0,NORTH', 'RIGHT', 'RIGHT', 'RIGHT', 'RIGHT'], expected: 'NORTH' },
    { input: ['PLACE 0,0,NORTH', 'LEFT'], expected: 'WEST' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'LEFT'], expected: 'SOUTH' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'LEFT', 'LEFT'], expected: 'EAST' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'LEFT', 'LEFT', 'LEFT'], expected: 'NORTH' }
]
var ValidMovingTests = [
    { input: ['PLACE 0,0,NORTH', 'MOVE'], expected: '0,1,NORTH' },
    { input: ['PLACE 0,0,NORTH', 'MOVE', 'MOVE'], expected: '0,2,NORTH' },
    { input: ['PLACE 0,0,NORTH', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'], expected: '0,4,NORTH' },
    { input: ['PLACE 0,0,EAST', 'MOVE'], expected: '1,0,EAST' },
    { input: ['PLACE 0,0,EAST', 'MOVE', 'MOVE'], expected: '2,0,EAST' },
    { input: ['PLACE 0,0,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'], expected: '4,0,EAST' }
]
var InvalidMovingTests = [
    { surfaceArea: { maxX: 4, maxY: 4 }, input: ['PLACE 0,0,NORTH', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'], expected: '0,4,NORTH' },
    { surfaceArea: { maxX: 4, maxY: 4 }, input: ['PLACE 0,0,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'], expected: '4,0,EAST' }
]
var ValidInputHandlingTests = [
    { input: ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'], expected: '0,1,NORTH' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'], expected: '0,0,WEST' },
    { input: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'], expected: '3,3,NORTH' }
]


describe("ToyRobot should", function () {
    it("turn correctly", function () {
        for (var test of TurningTests) {
            // Set max surface area
            robot = new Robot(4, 4);
            for (var item of test.input) {
                robot.takeCommand(item);
            }
            expect(Robot.Direction.GetName(robot.f)).toBe(test.expected);
        }
    });
    it("move correctly", function () {
        for (var test of ValidMovingTests) {
            // Set max surface area
            robot = new Robot(4, 4);
            for (var item of test.input) {
                robot.takeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
    it("not move off the surface area correctly", function () {
        for (var test of InvalidMovingTests) {
            // Set max surface area
            robot = new Robot(test.surfaceArea.maxX, test.surfaceArea.maxY);
            for (var item of test.input) {
                robot.takeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
    it("follow valid inputs correctly", function () {
        for (var test of ValidInputHandlingTests) {
            // Set max surface area
            robot = new Robot(4, 4);
            for (var item of test.input) {
                robot.takeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
    it("handle invalid inputs correctly", function () {
        expect(false).toBeTruthy():
    });
});