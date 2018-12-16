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
    { surfaceArea: { minX: 0, maxX: 4, minY: 0, maxY: 4 }, input: ['PLACE 0,0,NORTH', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'], expected: '0,4,NORTH' },
    { surfaceArea: { minX: 0, maxX: 4, minY: 0, maxY: 4 }, input: ['PLACE 0,0,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'], expected: '4,0,EAST' }
]
var ValidInputHandlingTests = [
    { input: ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'], expected: '0,1,NORTH' },
    { input: ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'], expected: '0,0,WEST' },
    { input: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'], expected: '3,3,NORTH' }
]
var InvalidSetupHandlingTests = [
    { surfaceArea: { minX: null, maxX: null, minY: null, maxY: null }, input: ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'], expected: 'I have no correction direction set up, or proper surface to move on!' },
    { surfaceArea: { minX: 0, maxX: 4, minY: 0, maxY: 4 }, input: ['PLACE 0,0,NORTHEAST', 'MOVE', 'REPORT'], expected: 'I have no correction direction set up, or proper surface to move on!' }
]


describe("ToyRobot should", function () {
    it("turn correctly", function () {
        for (var test of TurningTests) {
            robot = new Robot();
            // Set max surface area
            robot.setSurfaceArea(0, 4, 0, 4);
            for (var item of test.input) {
                robot.executeCommand(item);
            }
            expect(Robot.Direction.GetName(robot.f)).toBe(test.expected);
        }
    });
    it("move correctly", function () {
        for (var test of ValidMovingTests) {
            robot = new Robot();
            // Set max surface area
            robot.setSurfaceArea(0, 4, 0, 4);
            for (var item of test.input) {
                robot.executeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
    it("not move off the surface area", function () {
        for (var test of InvalidMovingTests) {
            robot = new Robot();
            // Set max surface area
            robot.setSurfaceArea(test.surfaceArea.minX, test.surfaceArea.maxX, test.surfaceArea.minY, test.surfaceArea.maxY);
            for (var item of test.input) {
                robot.executeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
    it("follow valid inputs correctly", function () {
        for (var test of ValidInputHandlingTests) {
            robot = new Robot();
            // Set max surface area
            robot.setSurfaceArea(0, 4, 0, 4);
            for (var item of test.input) {
                robot.executeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
    it("handle invalid inputs correctly", function () {
        for (var test of InvalidSetupHandlingTests) {
            robot = new Robot();
            // Set max surface area
            robot.setSurfaceArea(test.surfaceArea.minX, test.surfaceArea.maxX, test.surfaceArea.minY, test.surfaceArea.maxY);
            console.log(robot.surfaceArea);
            for (var item of test.input) {
                robot.executeCommand(item);
            }
            expect(robot.report()).toBe(test.expected);
        }
    });
});

describe("ToyRobotManager should", function () {
    it("follow valid inputs correctly", function () {
        for (var test of ValidInputHandlingTests) {
            robotManager = new RobotManager(0, 4, 0, 4);
            expect(robotManager.executeCommands(test.input)).toBe(test.expected);
        }
    });
    it("handle invalid inputs correctly", function () {
        for (var test of InvalidSetupHandlingTests) {
            robotManager = new RobotManager(test.surfaceArea.minX, test.surfaceArea.maxX, test.surfaceArea.minY, test.surfaceArea.maxY);
            expect(robotManager.executeCommands(test.input)).toBe(test.expected);
        }
    });
});