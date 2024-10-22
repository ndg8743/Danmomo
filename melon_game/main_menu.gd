extends Control

var game_scene: PackedScene = preload("res://main.tscn")
var multiplayer_menu: PackedScene = preload("res://multiplayer_menu.tscn")

func _on_single_player_btn_pressed() -> void:
	SceneManager.change_scene_to("res://main.tscn")


func _on_multi_player_btn_pressed() -> void:
	SceneManager.change_scene_to("res://multiplayer_menu.tscn")

func _on_leader_board_btn_pressed() -> void:
	SceneManager.change_scene_to("res://Leaderboard/leaderboard.tscn")
