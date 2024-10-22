extends Control

var game_scene_path: String = "res://queuemenu.tscn"

func _on_button_pressed() -> void:
	SceneManager.change_scene_to("res://main_menu.tscn")

func _on_login_btn_pressed() -> void:
	SceneManager.change_scene_to(game_scene_path)


func _on_guest_btn_pressed() -> void:
	SceneManager.change_scene_to(game_scene_path)
