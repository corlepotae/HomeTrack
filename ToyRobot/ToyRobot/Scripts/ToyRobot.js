class Robot {
    // Implement nested enumerator to make it clear to use
    // this enumerator to set a Robot's facing direction
    static get Direction() {
        return {
            NORTH: 0,
            EAST: 1,
            SOUTH: 2,
            WEST: 3,
            GetName: function (value) {
                for (var item in this) {
                    if (this[item] === value)
                        return item;
                }
            }
        };
    }

    constructor(maxX, maxY, x, y, f) {
        this.maxDirection = Object.keys(Robot.Direction).length - 2;
        this.minDirection = Robot.Direction.NORTH;
        this.place(x, y, f);
    }

    report() {
        return this.x + "," + this.y + "," + Robot.Direction.GetName(this.f);
    }

    place(x, y, f) {
        this.x = x;
        this.y = y;
        this.f = f;
    }
}