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

    constructor(maxX, maxY, x, y, f) {
        // Set maximum and minimum directions the robot can use
        this.minDirection = Robot.Direction.NORTH;
        this.maxDirection = Robot.Direction.WEST;

        // Set surface area for the robot
        this.setSurfaceArea(maxX, maxY);

        // Place robot to a specific location
        this.place(x, y, f);
    }

    takeCommand(command) {
        command = command.trim().toUpperCase();
        // Process positioning command
        if (command.includes("PLACE")) {
            var commandArgs = command.split(" ");
            if (!commandArgs.length > 2) {
                return;
            }

            var position = commandArgs[1].split(",");
            var x = Number(position[0].trim());
            var y = Number(position[1].trim());
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
                    this.report();
                    break;
            };
        }
    }

    report() {
        return this.x + "," + this.y + "," + Robot.Direction.GetName(this.f);
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
        if (resultX > this.surfaceArea.X) {
            resultX = this.surfaceArea.X;
        }

        if (resultX < 0) {
            resultX = 0;
        }

        if (resultY > this.surfaceArea.Y) {
            resultY = this.surfaceArea.Y;
        }

        if (resultY < 0) {
            resultY = 0;
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

    setSurfaceArea(maxX, maxY) {
        // Set surface area if the arguments are all numbers
        if (!isNaN(maxX) && !isNaN(maxY)) {
            // Set Surface area
            this.surfaceArea =
                {
                    X: maxX,
                    Y: maxY
                };
        }
    }
}