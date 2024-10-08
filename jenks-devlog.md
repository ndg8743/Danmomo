# Fall 2024 - Intro to Game Design @ SUNY New Paltz
* Name: CJ Jenks
* [Trello Board](https://trello.com/b/6GWgIG7v/danmomo)
* [Proposal](jenks-proposal.pdf)

## 2024-10-08 - 2hrs: Expand server architecture
* Added 3 basic servers; login, score, game.
* Add basic logic for 'plugins', which handles logic for server.

## 2024-10-04 - 1hr: Research more server architecture
* Look into how other open source games handle networking.
* See how Godot implements websockets.
* Basing the project of this Javascript project.

### 2024-10-01 - 13hrs: Continue to fix github actions script
* Fix git lfs issues to fix corrupted project files.
* Most of the time was spent waiting for the action as the action cannot be tested locally.
* Worked with other students to fix corrupted files, then the script itself.
* All pushes to main going forward will update the project on itchio.

### 2024-09-30 - 3hrs: Fix github action script
* Tried 4 different scripts, went back to first one and modified it.
* Looked at other github repositories to see how they use the scripts and compared our script.

### 2024-09-24 - .5hr: Work on basic server architecture
* Add basic hello world typescript server.
* Load port from config file for server to use.
* Plan is to get a basic socketio server tonight, just basic communication.