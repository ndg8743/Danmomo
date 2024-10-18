# Fall 2024 - Intro to Game Design @ SUNY New Paltz
* Name: CJ Jenks
* [Trello Board](https://trello.com/b/6GWgIG7v/danmomo)
* [Proposal](jenks-proposal.pdf)

## 2024-10-17 - .5hrs: Merge main into my network branch
* Merge the contents of the main branch into my network branch.
* Nathan added bombs and general game changes on main but my code on the network branch was behind.
* This will allow me to add networking on the most up to date game version.

## 2024-10-17 - 2.5hrs: Add basic match netcode, add production
* Remove login and score server to consolidate into one big game server to ease development.
* Make the github action push to both mine and Nathan's itchio page.
* Add production node server for the server to run in AWS for hosting.
* Add basic netcode for player's in a match together, aka sending fruit, bombs, winning/losing, etc.

## 2024-10-16 - 2.5hrs: Finish basic server and godot implementation, swap from socket.io to websockets
* Got basic connection working with godot and server using third party tools.
* Problem was I used socket.io to make the server, this is an easy switch but it means I had to switch libraries.
* Spent a bit swapping to websockets, luckily socket.io is built on top of websockets so no huge changes were necessary.
* Basic communication with server and plugins is working.
* Tomorrow I will continue to work on server integration which should be the first signs of a multiplayer demo.
* This was all done on a seperate branch.

## 2024-10-15 - 4.5hrs: Finish basic server architecture, implement plugins, and matchmaking
* Reworked architecture to better fit the project.
* Properly handle and implement plugins.
* Add basic login plugin, need to work on authentication but its a low priority, allow users to be "guests" (not signed in)
* Add matchmaking, which allows players to join a queue and if they dont ready in 15 seconds they will need to requeue.
* Tested this all with Postman socketio.

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