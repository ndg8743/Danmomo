extends Control

var game_scene_path: String = "res://multiplayer_world.tscn"
@onready var status_label: Label = $Label
@onready var queue_button: Button = $MarginContainer/VBoxContainer/Panel/MarginContainer/VBoxContainer/QueueBtn
@onready var ready_button: Button = $MarginContainer/VBoxContainer/Panel/MarginContainer/VBoxContainer/ReadyBtn

func _ready() -> void:
	ready_button.disabled = true
	ready_button.visible = false

func _on_queue_btn_pressed() -> void:
	status_label.text = "Queuing up..."
	queue_button.disabled = true
	ready_button.disabled = true
	ready_button.visible = false
	
	# Send queue request to server
	var message = {
		"action": "queueMatch",
		"args": {
			"type": "versus"
		}
	}
	Connection.send_text(JSON.stringify(message))  # Assumes `send_to_server()` sends data to the server

func _on_ready_btn_pressed() -> void:
	ready_button.disabled = true
	status_label.text = "Ready!"
	
	# Send ready message to server
	var message = {
		"action": "ready",
		"args": {}
	}
	Connection.send_text(JSON.stringify(message))

func _on_back_btn_pressed() -> void:
	# Cancel queue on server
	var message = {
		"action": "cancel_queue",
		"args": {}
	}
	Connection.send_text(message)
	
	SceneManager.change_scene_to("res://multiplayer_menu.tscn")

# This function processes messages received from the server
func _on_message_received(message: String) -> void:
	var data = JSON.parse_string(message)
	if data.error == OK:
		match data.result["action"]:
			"queueStarted":
				status_label.text = data.result["message"]
				# Enable ready button when queue is confirmed
				ready_button.disabled = false
				ready_button.visible = true

			"matchStarted":
				status_label.text = data.result["message"]
				# Todo: switch to multiplayer scene
				SceneManager.change_scene_to(game_scene_path)

			"matchFailed":
				status_label.text = data.result["message"]
				# Re-enable queue button if match failed
				queue_button.disabled = false

			"matchSuccess":
				# Todo: start the match, switch to multiplayer world
				status_label.text = "Match found! Starting game..."
				SceneManager.change_scene_to(game_scene_path)

			"requeue":
				status_label.text = "Not all players are ready. Requeuing..."
				# You might need to reset buttons if requeuing
				ready_button.disabled = true
				ready_button.visible = false
				queue_button.disabled = false
