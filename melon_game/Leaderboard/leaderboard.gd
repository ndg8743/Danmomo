extends CanvasLayer
class_name Leaderboard

var menu_scene_path: String = "res://main_menu.tscn"
#var game_scene_path: String = "res://main.tscn"

var score_row_scene: PackedScene = preload("res://Leaderboard/score_row.tscn")

@onready var score_container: VBoxContainer = $Panel/MarginContainer/VBoxContainer/ScrollContainer/Scores

var score_data: Array = []

func _ready() -> void:
	load_data()
	refresh_leaderboard()

func sort_data_by_score(a,b):
	return a.score > b.score


func add_score(username,score):
	score_data.append({"username": username, "score":score})
	refresh_leaderboard()


func refresh_leaderboard():
	#Cleanup leaderboard
	var displayed_scores = score_container.get_children()
	for score_row in displayed_scores:
		score_row.queue_free()
	
	score_data.sort_custom(sort_data_by_score)
	
	for data in score_data:
		var score_row: ScoreRow = score_row_scene.instantiate()
		score_container.add_child(score_row)
		score_row.user_lbl.text = data['username']
		score_row.score_lbl.text = str(data['score'])


func load_data():
	var file = FileAccess.open("res://Data/dummy_scores.json",FileAccess.READ)
	var text_data: String = file.get_as_text()
	var json_data = JSON.parse_string(text_data)
	
	score_data = json_data


func _on_retry_btn_pressed() -> void:
	SceneManager.change_scene_to(menu_scene_path)

func _on_exit_btn_pressed() -> void:
	get_tree().quit()
