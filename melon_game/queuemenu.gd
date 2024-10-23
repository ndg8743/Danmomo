extends Control

var game_scene_path: String = "res://multiplayer_world.tscn"
@onready var status_label: Label = $Label
@onready var queue_button: Button = $MarginContainer/VBoxContainer/Panel/MarginContainer/VBoxContainer/QueueBtn
@onready var ready_button: Button = $MarginContainer/VBoxContainer/Panel/MarginContainer/VBoxContainer/ReadyBtn

func _ready() -> void:
	ready_button.disabled = true
	ready_button.visible = false
	var callable = Callable(self, "_on_connection_message_received")
	Connection.connect("message_received", callable)

func _on_queue_btn_pressed() -> void:
	status_label.text = "Queuing up..."
	queue_button.disabled = true
	ready_button.disabled = true

	ready_button.disabled = false
	ready_button.visible = true
	
	# Send queue request to server
	var message = {
		"action": "queueMatch",
		"args": {
			"match": "versus"
		}
	}
	Connection.send_text(JSON.stringify(message))

func _on_ready_btn_pressed() -> void:
	ready_button.disabled = true
	status_label.text = "Ready!"
	
	# Send ready message to server
	var message = {
		"action": "readyQueue",
		"args": { "match": "versus"}
	}
	Connection.send_text(JSON.stringify(message))

func _on_back_btn_pressed() -> void:
	# Cancel queue on server
	var message = {
		"action": "cancelQueue",
		"args": {}
	}
	Connection.send_text(message)
	
	SceneManager.change_scene_to("res://multiplayer_menu.tscn")

# This function processes messages received from the server
func _on_message_received(message: String) -> void:
	print("!")
	var json = JSON.new()
	var parse_result = json.parse_string(message)

	print("!")

	# Check if parsing was successful
	if parse_result.error == OK:
		var data = parse_result.result  # This will be a Dictionary
		print(data)  # Output the parsed data

		# Handle the actions based on the parsed data
		match data.get("action", ""):
			"queueStarted":
				status_label.text = data.get("message", "Queue started.")
				ready_button.disabled = false
				ready_button.visible = true

			"matchStarted":
				status_label.text = data.get("message", "Match started.")
				SceneManager.change_scene_to(game_scene_path)

			"matchFailed":
				status_label.text = data.get("message", "Match failed.")
				queue_button.disabled = false

			"matchSuccess":
				status_label.text = "Match found! Starting game..."
				SceneManager.change_scene_to(game_scene_path)

			"requeue":
				status_label.text = "Not all players are ready. Requeuing..."
				ready_button.disabled = true
				ready_button.visible = false
				queue_button.disabled = false
	else:
		print("Failed to parse JSON: %s" % parse_result.error)
