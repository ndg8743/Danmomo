# Fall 2024 - Intro to Game Design @ SUNY New Paltz
* Name: Nathan Gopee
* [Trello Board](https://trello.com/b/6GWgIG7v/danmomo)
* [Proposal](https://github.com/ndg8743/Danmomo/blob/main/Danmomo%20Proposal%20-%20Nathan%20Gopee.pdf)

### 2024-11-25/2024-11-26 - 8 hrs: Fixing Multiplayer Layout and Refining Future Fruit
- Redesigned the multiplayer layout to improve the separation of Player 1 and Player 2 zones, ensuring intuitive gameplay boundaries.
- Resolved an issue with the future fruit indicator's position, which was inconsistent across multiplayer sessions. This required recalibrating the cursor positioning system.
- Enhanced the game scene’s layering system to prioritize essential UI elements and eliminate redundant objects.
- Updated fruit-dropping mechanics to synchronize accurately with server-side data, ensuring fairness between players.
- Committed changes to GitHub.

### 2024-11-22 - 5 hrs: Preparing and Refining Presentation Materials
- Reviewed the game’s major milestones and created a detailed presentation.
- Updated the presentation with screenshots.
- Committed changes to GitHub.

### 2024-10-29 - 5 hrs: Background Layer Fixes and Export Updates
- Reworked the background layering in the game to improve visual clarity and align assets with the intended design.
- Debugged export-related issues that caused asset references to break in the build process.
- Adjusted the z-index for multiple game elements, ensuring clean and professional visual presentation during gameplay.
- Validated the fixes by building and running the game on different devices to confirm compatibility.
- Committed changes to GitHub.

### 2024-10-27 - 4 hrs: Dropper Synchronization and Cursor Refinement
- Focused on refining the dropper system to align with cursor positions, especially for multiplayer gameplay.
- Fixed a bug that caused Player 2's fruit to misalign during multiplayer matches.
- Enhanced fruit physics to ensure consistent behavior across different scales and placements.
- Conducted targeted playtests to confirm improvements and eliminate lingering synchronization issues.
- Committed changes to GitHub.

### 2024-10-25 - 6 hrs: Improved Wall Interactions and Adjusted Visual Effects
- Updated the walls’ collision system to make bomb interactions more impactful and dynamic.
- Began experimenting with new visual effects for bomb explosions to increase player satisfaction.
- Resolved a bug that caused visual glitches when multiple bombs were used near walls.
- Improved the scaling logic for bombs to better reflect their size and impact during gameplay.
- Committed changes to GitHub.

### 2024-10-21/2024-10-22 - 8 hrs: Multiplayer, Leaderboard, Signals, and Fixing Floor Bugs
- Put together the multiplayer scene and routed the scenes to the main menu. I also added a leaderboard scene for players to check their scores after each game, which updates a JSON file.
- Hit a bug where bombs stopped ending the game properly. After some debugging, I managed to fix the bomb explosion logic so it worked as intended again.
- Looked into Godot docs on signal buses to handle game ending and other animations.
- Added juice animation/shader for when fruits explode with bombs. 
- Spent a while fixing the cracking effects on the floor when bombs go off. The floor wasn’t disappearing when the game was supposed to end, so the game kept going until the balls fell off the side. 
- Ended up fixing this by making the floor a wall, which also solved the cracking issue.
- Checked out Godot docs on shaders to refine the juice to make sure the new changes worked smoothly.
- Committed everything and deployed correctly via GitHub Actions.

### 2024-10-20 - 5 hrs: Added Signals + Edit Walls and Bomb Mechanics
- Adjusted the way bombs react near walls to improve the overall feel.
- Dug into Godot documentation for signal buses to ensure explosions triggered correctly and influenced the environment.
- Hit a bug where bombs stopped ending the game properly. After some debugging, I managed to fix the bomb explosion logic so it worked as intended again.
- Looked into Godot docs on signal buses to handle multiplayer events and score tracking.

### 2024-10-18/2024-10-19 - 6 hrs: Juice Animations, Cracking Sprite, and Main Menu
- Started looking into juice animations and shaders for juice triggered by bombs. I began playing around with shaders to make the visuals more satisfying. 
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
