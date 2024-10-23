# Fall 2024 - Intro to Game Design @ SUNY New Paltz
* Name: Nathan Gopee
* [Trello Board](https://trello.com/b/6GWgIG7v/danmomo)
* [Proposal](https://github.com/ndg8743/Danmomo/blob/main/Danmomo%20Proposal%20-%20Nathan%20Gopee.pdf)

### 2024-10-21/2024-10-22 - 8 hrs: Multiplayer, Leaderboard, Signals, and Fixing Floor Bugs
- Put together the multiplayer screen—players can click to join a server or start their own session. I also added a leaderboard for players to check their scores after each game, which updates a JSON file.
- Hit a bug where bombs stopped ending the game properly. After some debugging, I managed to fix the bomb explosion logic so it worked as intended again.
- Looked into Godot docs on signal buses to handle multiplayer events and score tracking.
- Added juice animation/shader for when fruits merge—really helps add some visual feedback to the game. 
- Got the bomb count working smoother after tweaking how they show up and adjusting the bomb count display.
- Spent a while fixing the cracking effects on the floor when bombs go off. The floor wasn’t disappearing when the game was supposed to end, so the game kept going until the balls fell off the side. 
- Ended up fixing this by making the floor a wall, which also solved the cracking issue.
- Checked out Godot docs on shaders to refine the bomb explosion look and made sure the new changes worked smoothly.
- Committed everything and deployed correctly via GitHub Actions.

### 2024-10-20 - 5 hrs: Added Signals + Edit Walls and Bomb Mechanics
- Adjusted the way bombs react near walls to improve the overall feel.
- Dug into Godot documentation for signal buses to ensure explosions triggered correctly and influenced the environment.
- Hit a bug where bombs stopped ending the game properly. After some debugging, I managed to fix the bomb explosion logic so it worked as intended again.
- Looked into Godot docs on signal buses to handle multiplayer events and score tracking.

### 2024-10-18/2024-10-19 - 6 hrs: Juice Animations, Cracking Sprite, and Main Menu
- Started adding juice animations for fruit merging. I began playing around with shaders to make the visuals more satisfying. 
- Start making up the multiplayer menu option/main menu.
- Added cracking walls and a cracking sprite to enhance the visual effects when bombs go off.
- Looked into Godot docs for shaders and multiplayer to make sure the basics were functioning right.

### 2024-10-16 - 6hrs: Bomb Functionality and UI Implementation
- Bomb explosion/count debugging, reducing the explosion radius and tweaking visual effects.
- Refined bomb count tracking and UI updates for smooth gameplay.
- Conducted playtesting to ensure bombs and the UI function correctly.
- Adjusted bomb sprite visibility and ensured bomb count updates in real-time when bombs are used.
- Committed changes to GitHub.

### 2024-10-15 - 2hrs: Further Bomb Mechanics and Playtesting
- Fixed minor issues with bomb display logic and committed updated changes.
- Worked on the integration of bombs with the dropper and UI.
- Debugged issues with bomb instantiation and display within the game.

## 2024-10-08 - 3hrs: Playtests
* In class playtests were conducted.
* Minor visual glitches and physics can be improved.

### 2024-09-30 - 2024-09-30 - 8hrs: Debugged Build/Script
- Debugged the build errors
- Added bombs sprites to update count
- Added implementation between bomb/dropper/bomb_count
- Worked with other students to fix GitHub Actions script for Itch.io upload

### 2024-09-24/25 - 6hrs: Configured GitHub/Itch.io
- Added formatting to adhere to project requirements
- Connected GitHub to Itch.io
- Attempted to set up GitHub Action for Itch.io

### 2024-09-18 - 4hrs: Initial Upload/Implementation Attempt
- Cloned repo for Godot Suika Game Clone
- Sorted out the repo and reformatted
- Attempted to add bomb.tscn/scripts
- Attempted to modify dropper to accept bombs
- Found possible assets
