class RobotManager {
    constructor(minX, maxX, minY, maxY) {
        this.surfaceArea =
            {
                minX: parseInt(minX),
                maxX: parseInt(maxX),
                minY: parseInt(minY),
                maxY: parseInt(maxY)
            };
    }

    executeCommands(commands) {
        var robot = new Robot();
        var result = '';
        robot.setSurfaceArea(this.surfaceArea.minX, this.surfaceArea.maxX, this.surfaceArea.minY, this.surfaceArea.maxY);
        if (commands instanceof Array) {
            for (var command of commands) {
                result = robot.executeCommand(command);
            }
        }
        return result;
    }
}

class Robot {
    // Implement nested enumerator to make it clear to use
    // this enumerator to set a Robot's facing direction
    static get Direction() {
        return {
            NORTH: 0,
            EAST: 1,
            SOUTH: 2,
            WEST: 3,
            // A function for translating the enum value to string
            GetName: function (value) {
                for (var item in this) {
                    if (this[item] === value)
                        return item;
                }
            }
        };
    }

    constructor() {
        // Set maximum and minimum directions the robot can use
        this.minDirection = Robot.Direction.NORTH;
        this.maxDirection = Robot.Direction.WEST;
    }

    executeCommand(command) {
        command = command.trim().toUpperCase();
        // Process positioning command
        if (command.includes("PLACE")) {
            var commandArgs = command.split(" ");
            if (!commandArgs.length > 2) {
                return;
            }

            var position = commandArgs[1].split(",");
            var x = parseInt(position[0].trim());
            var y = parseInt(position[1].trim());
            var f = Robot.Direction[position[2].trim()];
            this.place(x, y, f);
        }
        // Process movement command
        else {
            switch (command) {
                case "MOVE":
                    this.move();
                    break;
                case "LEFT":
                    this.turnLeft();
                    break;
                case "RIGHT":
                    this.turnRight();
                    break;
                case "REPORT":
                    return this.report();
            };
        }
    }

    report() {
        if (this.hasValidSetup()) {
            return 'I have no correction direction set up, or proper surface to move on!';
        }
        else {
            return this.x + "," + this.y + "," + Robot.Direction.GetName(this.f);
        }
    }

    place(x, y, f) {
        this.x = x;
        this.y = y;
        // Only set facing direction if the argument is a valid direction
        if (f >= this.minDirection && f <= this.maxDirection) {
            this.f = f;
        }
    }

    move(moveCount = 1) {
        if (this.hasValidSetup()) {
            return;
        }

        var resultX = this.x;
        var resultY = this.y;

        switch (this.f) {
            case Robot.Direction.NORTH:
                resultY += moveCount;
                break;
            case Robot.Direction.EAST:
                resultX += moveCount;
                break;
            case Robot.Direction.SOUTH:
                resultY -= moveCount;
                break;
            case Robot.Direction.WEST:
                resultX -= moveCount;
                break;
        }
        // Prevent robot from move out of surface area
        if (resultX > this.surfaceArea.maxX) {
            resultX = this.surfaceArea.maxX;
        }

        if (resultX < this.surfaceArea.minX) {
            resultX = this.surfaceArea.minX;
        }

        if (resultY > this.surfaceArea.maxY) {
            resultY = this.surfaceArea.maxY;
        }

        if (resultY < this.surfaceArea.minY) {
            resultY = this.surfaceArea.minY;
        }
        this.x = resultX;
        this.y = resultY;
    }

    turnLeft(turnCount = 1) {
        this.turn(-turnCount);
    }

    turnRight(turnCount = 1) {
        this.turn(turnCount); 
    }

    turn(turnCount = 1) {
        if (this.hasValidSetup()) {
            return;
        }

        // Calculating circular turning direction
        var totalDirections = this.maxDirection + 1;
        var nextDirection = (this.f + turnCount) % totalDirections;
        // If next direction is less than minimum direction
        // then do reverse calculation to find the next direction
        if (nextDirection < this.minDirection) {
            this.f = totalDirections - Math.abs(nextDirection);
        }
        // Otherwise assign the result directly
        else {
            this.f = nextDirection;
        }
    }	

    setSurfaceArea(minX, maxX, minY, maxY) {
        // Set surface area if the arguments are all numbers
        if (!(isNaN(parseInt(minX)) && isNaN(parseInt(maxX)) && isNaN(parseInt(minY)) && isNaN(parseInt(maxY)))) {
            // Set Surface area
            this.surfaceArea =
                {
                    minX: minX,
                    maxX: maxX,
                    minY: minY,
                    maxY: maxY
                };
        }
    }

    hasValidSetup() {
        return this.surfaceArea == null
            || this.f == null
            || this.x < this.surfaceArea.minX
            || this.x > this.surfaceArea.maxX
            || this.y < this.surfaceArea.minX
            || this.y > this.surfaceArea.maxY;
    }
}