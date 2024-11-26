# Fall 2024 - Intro to Game Design @ SUNY New Paltz
* Name: CJ Jenks
* [Trello Board](https://trello.com/b/6GWgIG7v/danmomo)
* [Proposal](jenks-proposal.pdf)

## 2024-11-25 - 6.5hr: Fix issues with dropper and matchmaking
* Fixed the multiplayer world scene (locations of containers, future fruit, etc).
* Fixed dropper location for player 1 and player 2
* Work on polishing up, ex: sending more data over the network so the screen mirror is more accurate.
* Fix match making for backend, (not allowing player to requeue match if they quit).

## 2024-11-21 - 4.5hr: Fix issues with multiplayer world scene and AWS research
* Multiplayer world was not set up properly as it was just copied from the singleplayer world and modified to have two players.
* Adjust killzones and future fruit locations.
* Look into AWS for hosting the server.

## 2024-11-14 - 4hr: Investigate the dropper and scenes
* Look into why scene is causing issues with dropper.
* Test my dropper scripts on the normal single player scene, and I see its broken, this was a issue.
* See what values I need to adjust to send over the network.

## 2024-11-09 - 1.5hr: Clean up scripts and project since merge
* Clean the scene and scripts up as they were getting a bit sloppy.
* Fix issues with node dependencies for server

## 2024-11-05 - 2.5hr: Debug issues with networking
* There seem to be issues with networking, specifically recieiving the proper location.
* Location was not being properly sent and was sending incorrect data, this was fixed.
* Several remaining issues with networking that need to be fixed, drop locations, lag/input delay, etc.

## 2024-10-29 - 2hr: Finished network merge
* Fixed all issues with git conflicts.
* Got a lot of the smaller values fixed or close to fix (ex: dropper location, etc)
* Still issues with dropper for both players.

## 2024-10-24 - 2hr: Work on polishing network merge
* I had previously merged my work into main but it still was off.
* Values needed to be adjusted and tweaked to make sure it was still correct.
* Running into issues with dropper with player 1 and player 2.

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