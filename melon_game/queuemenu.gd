extends Control

var game_scene_path: String = "res://multiplayer_world.tscn"

func _ready() -> void:
	pass

func _on_queue_btn_pressed() -> void:
	# start queue
	pass

func _on_back_btn_pressed() -> void:
	SceneManager.change_scene_to("res://multiplayer_menu.tscn")
