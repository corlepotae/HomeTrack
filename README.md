# HomeTrack
The solution includes 2 main classes;

Robot 
	- The concrete robot class that implements all the movement functionalities.
	- The robot class a few main functionalities;
		1. setSurfaceArea(minX, maxX, minY, maxY): Set the surface area the robot can move on.
		2. place(x, y, f): Place robot on the specificed location and direction. (Robot.Direction enum should be used for the f paramater)
		3. move(moveCount = 1): Move robot multiple times in one call according to the argument. (default to 1 move)
		4. turnRight(moveCount = 1): Turn robot clockwise multiple times in one call according to the argument. (default to 1 turn)
		5. turnLeft(moveCount = 1): Turn robot counter clockwise multiple times in one call according to the argument. (default to 1 turn)
		6. executeCommand(command): Take a text command and translate it into a function execution.
		7. report(): Report the current location and direction of the report.
		
RobotManager - A manager class that helps managing the robot command and also assign surface area to the robot.
	- The RobotManager constructor is used to set the surface area to be used for the robot.
	- The executeCommands(commands) function takes an array of commands and pass them to a robot initiated withing the function.

The Robot class can be used by itself. However, the setSurfaceArea() function has to be executed with the correct paramater first, then follow with place() function, by calling the method directly or pass 'PLACE X,Y,F' command to the executeCommand function, to set up surface area and place a robot on it respectively. The the robot can move by calling the movement functions directly, or through the string commands, 'MOVE', 'LEFT', 'RIGHT', 'REPORT' which will be translated by the robot class into movements/report.

The RobotManager class can be used to simplify the process by taking multiple commands in one call using executeCommands() function in order to achieve the same result as using the Robot class to take command one by one.

The unit tests are done using Jasmine framework. To run the unit tests, please run the project to view the result on a browser.